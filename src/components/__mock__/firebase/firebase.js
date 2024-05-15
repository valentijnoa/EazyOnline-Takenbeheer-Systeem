// This is a simple mock of Firebase Firestore and Auth services
const mockFirestore = () => {
  let db = {};
  return {
    collection: (name) => ({
      add: (doc) => {
        const id = Math.random().toString(36).substring(2, 15);
        db[name] = db[name] || [];
        db[name].push({ ...doc, id });
        return Promise.resolve({ id });
      },
      docs: db[name] || [],
    }),
  };
};

const mockAuth = () => ({
  // Mock any auth functions you use
  currentUser: null,
  signInWithEmailAndPassword: () => Promise.resolve("Mocked user"),
  signOut: () => Promise.resolve(),
});

module.exports = {
  initializeApp: () => ({
    firestore: mockFirestore,
    auth: mockAuth,
  }),
  getFirestore: mockFirestore,
  getAuth: mockAuth,
};
