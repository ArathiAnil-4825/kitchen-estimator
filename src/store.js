export const StorageKeys = {
  users: "app_users",
  projects: "app_projects",
  currentUser: "app_current_user"
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const Seed = {
  ensureAdminSeeded() {
    const users = load(StorageKeys.users, []);
    const hasAdmin = users.some(u => u.role === "Administrator");
    if (!hasAdmin) {
      users.push({
        id: generateId("user"),
        name: "System Administrator",
        email: "admin@example.com",
        password: "admin123",
        role: "Administrator"
      });
      save(StorageKeys.users, users);
    }
  }
};

export const AuthService = {
  register({ name, email, password, role }) {
    const allowedRoles = ["Homeowner", "Contractor"];
    if (!allowedRoles.includes(role)) {
      throw new Error("Only Homeowner or Contractor can register.");
    }
    const users = load(StorageKeys.users, []);
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already registered.");
    }
    const user = { id: generateId("user"), name, email, password, role };
    users.push(user);
    save(StorageKeys.users, users);
    return user;
  },
  login({ name, email, password, role }) {
    const users = load(StorageKeys.users, []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (!user) throw new Error("User not found for role.");
    if (user.password !== password) throw new Error("Invalid password.");
    if (name && user.name && user.name.trim().toLowerCase() !== name.trim().toLowerCase()) {
      throw new Error("Name does not match.");
    }
    save(StorageKeys.currentUser, user);
    return user;
  },
  currentUser() {
    return load(StorageKeys.currentUser, null);
  },
  logout() {
    localStorage.removeItem(StorageKeys.currentUser);
  },
  listContractors() {
    const users = load(StorageKeys.users, []);
    return users.filter(u => u.role === "Contractor");
  }
};

export const ProjectService = {
  createAndSendToContractor({ homeownerEmail, projectName, projectType, kitchenAreaSqFt, contractorEmail }) {
    const projects = load(StorageKeys.projects, []);
    const project = {
      id: generateId("proj"),
      homeownerEmail,
      contractorEmail,
      name: projectName,
      type: projectType, // Construction | Renovation
      kitchenAreaSqFt: Number(kitchenAreaSqFt) || 0,
      items: [],
      status: "to_contractor",
      total: 0
    };
    projects.push(project);
    save(StorageKeys.projects, projects);
    return project;
  },
  getProjectsForContractor(contractorEmail) {
    const projects = load(StorageKeys.projects, []);
    return projects.filter(p => p.contractorEmail === contractorEmail);
  },
  getProjectsForAdmin() {
    const projects = load(StorageKeys.projects, []);
    return projects.filter(p => p.status === "to_admin");
  },
  getProjectsForHomeowner(homeownerEmail) {
    const projects = load(StorageKeys.projects, []);
    return projects.filter(p => p.homeownerEmail === homeownerEmail);
  },
  getById(projectId) {
    const projects = load(StorageKeys.projects, []);
    return projects.find(p => p.id === projectId) || null;
  },
  addItemsAndSendToAdmin(projectId, items) {
    const projects = load(StorageKeys.projects, []);
    const idx = projects.findIndex(p => p.id === projectId);
    if (idx === -1) throw new Error("Project not found");
    const parsed = items.map(it => ({ name: it.name, cost: Number(it.cost) || 0 }));
    projects[idx].items = parsed;
    projects[idx].status = "to_admin";
    save(StorageKeys.projects, projects);
    return projects[idx];
  },
  approveComputeTotalAndSendToHomeowner(projectId) {
    const projects = load(StorageKeys.projects, []);
    const idx = projects.findIndex(p => p.id === projectId);
    if (idx === -1) throw new Error("Project not found");
    const total = (projects[idx].items || []).reduce((sum, it) => sum + (Number(it.cost) || 0), 0);
    projects[idx].total = total;
    projects[idx].status = "to_homeowner";
    save(StorageKeys.projects, projects);
    return projects[idx];
  }
};