class StorageManager {
  constructor(name = "todoAppProjects") {
    this.storagename = name;
  }

  save(data) {
    localStorage.setItem(this.storagename, JSON.stringify(data));
  }

  load() {
    const raw = localStorage.getItem(this.storagename);
    return raw ? JSON.parse(raw) : null;
  }

  clear() {
    localStorage.removeItem(this.storagename);
  }
}

export default StorageManager;
