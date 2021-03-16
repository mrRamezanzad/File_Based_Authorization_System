const express = require("express"),
      router  = express.Router(),
      path    = require("path"),
      fs      = require("fs")

// ============= Render Login Page ==================
router.get("/login", (req, res) => {
    res.render(path.join(__dirname, "../views/login.ejs"))
})

// ================== Login Authentication ==================
router.post("/login", (req, res) => {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8"))
    let userInfo = req.body

    if (loginUser(userInfo)) {
        
        let userIndex = users.findIndex(user => user.username === userInfo.username)
        users[userIndex].isLoggedIn = "true"

        fs.writeFile(path.join(__dirname, "../DB/users.json"), JSON.stringify(users), (err) => {
            if (err) console.log(err);
            res.status(200).json(`{"msg": "خوش آمدید!", "uid": ${users[userIndex].id}}`)
        })

    } else res.status(400).json(`{"msg": "کاربری با این مشخصات یافت نشد!"}`)
})

// Check If The User Exists
function loginUser(userInfo) {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8"))
    let targetUser = users.find(user => user.username === userInfo.username && user.password === userInfo.password)
    return targetUser === undefined ? false : true
}

// ================== Render Login Page ==================
router.get("/signup", (req, res) => {
    res.render(path.join(__dirname, "../views/signup.ejs"))
})

// ================== Authenticate ==================
router.post("/signup", (req, res) => {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8"))
    let newUserInfo = req.body

    if (createUser(newUserInfo)) return res.status(201).json({"msg": "اکانت شما با موفقیت ساخته شد."})
    res.status(401).json({"msg": "کاربری با این مشخصات وجود دارد!"})
    
})

// user creation functionality
function createUser(newUserInfo) {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8"))
    newUserInfo.id = generateId()
    
    if (availableNewUser(newUserInfo)) {
        users.push(newUserInfo)
        users = fs.writeFileSync(path.join(__dirname, "../DB/users.json"), JSON.stringify(users))
        return true

    } else return false
}

// Check If The Id And Username Is Unique
function availableNewUser(newUserInfo) {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8"))

    return users.findIndex(user => user.id === newUserInfo.id || user.username === newUserInfo.username) === -1 ? true : false
}

// Generate Random Id
function generateId() {
    return (Math.random() * Math.random() * 1000000000).toFixed()
}

// ================== Render Profile Page ==================
router.get("/profile/:id", (req, res) => {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8")),
    targetUser = users.find(user => {return parseInt(user.id) === parseInt(req.params.id)})

    if (!targetUser) return res.redirect("/signup")
    if (isLoggedIn(targetUser)) return res.render(path.join(__dirname, "../views/profile.ejs"), {user: targetUser})
    res.redirect("/login")

})

// Check If The User Is Logged In To Enter The Profile
function isLoggedIn(user) {
    return user.isLoggedIn === "true" ? true : false
}

// ================== Logout Route==================
router.post("/logout/:id", (req, res) => {
    logoutUser(req.params.id)
    res.status(200).json({"msg": `به امید دیدار!`})
})

// Logout The User
function logoutUser(id) {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8")),
    userIndex = users.findIndex(user => parseInt(user.id) === parseInt(id))
    users[userIndex].isLoggedIn = "false"

    try {

        fs.writeFileSync(path.join(__dirname, "../DB/users.json"), JSON.stringify(users))
        return true

    } catch (err) {

        console.log(err);
        return false
    }

}


// ================== Update User Info Route ================== 
router.post("/edit/:id", (req, res) => {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8")),
    userIndex = users.findIndex(user => parseInt(user.id) === parseInt(req.params.id))
    editedUser = req.body

    if (isLoggedIn(users[userIndex])) {
        if (editUser(userIndex, editedUser, users)) {

            res.status(200).json({"msg": "اطلاعات با موفقیت به روز رسانی شد!","location": "/login"})

        } else {
            res.status(200).json({"msg": "اطلاعات با موفقیت به روز رسانی شد!"})
        }

    } else {
        res.status(401).json({"msg": "ابتدا وارد پروفایل خود شوید", "location": "/login"})
    }
})

// Edit User In Db
function editUser(userIndex, editedUser) {
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../DB/users.json"), "utf8"))

    if (users[userIndex].password !== editedUser.password) {
        users[userIndex] = editedUser
        users[userIndex].isLoggedIn = "false"

        fs.writeFileSync(path.join(__dirname, "../DB/users.json"), JSON.stringify(users))
        return true
    }

    users[userIndex] = editedUser
    fs.writeFileSync(path.join(__dirname, "../DB/users.json"), JSON.stringify(users))
    return false
}

module.exports = router