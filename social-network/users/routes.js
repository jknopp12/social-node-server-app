import * as dao from "./dao.js";
export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    }
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        let currentUser;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        } else {
            const currentUser = await dao.createUser(req.body);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        }
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.sendStatus(401);
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    // Example in Node.js using Express
    app.post('/api/users/profile', (req, res) => {
        console.log('Received request to /api/users/profile:', req.session); // Log the received session

        // Your session validation logic here
        if (req.session && req.session.userId) {
            console.log('Session is valid:', req.session.userId); // Log session validation
            // Your code to handle the request
            res.json({ message: 'Profile data' }); // Return the profile data
        } else {
            console.log('Session is invalid'); // Log session validation failure
            res.status(401).json({ message: 'Unauthorized' }); // Return 401 error
        }
    });


    const getUserRole = async (req, res, next) => {
        const userId = req.params.userId;
        dao.findUserById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json({ role: user.role });
            })
            .catch(next);
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    // app.post("/api/users/profile", profile);
    app.get("/api/users/:userId/role", getUserRole);
}
