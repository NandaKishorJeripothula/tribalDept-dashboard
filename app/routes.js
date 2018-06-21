// app/routes.js
module.exports = function(app, passport) {

	var path= require('path');
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("TWD Cookie Set");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// DASHBOARD SECTION ===================
	// =====================================
	app.get('/dashboard', isLoggedIn, function(req, res) {
		res.render('dashboard.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// INSTITUTIONS SECTION ================
	// =====================================
	app.get('/institutions', isLoggedIn, function(req, res) {
		res.render('institutions.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// MAP SECTION ================
	// =====================================
	app.get('/map', isLoggedIn, function(req, res) {
		res.render('map.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// officers SECTION ================
	// =====================================
	app.get('/officers', isLoggedIn, function(req, res) {
		res.render('officers.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// =====================================
	// STAFF SECTION ================
	// =====================================
	app.get('/staff', isLoggedIn, function(req, res) {
		res.render('staff.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// PROVISION SECTION ================
	// =====================================
	app.get('/provision', isLoggedIn, function(req, res) {
		res.render('provision.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// MEDICAL SECTION ================
	// =====================================
	app.get('/medical', isLoggedIn, function(req, res) {
		res.render('medical.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// INFRASTRUCTURE SECTION ================
	// =====================================
	app.get('/infrastructure', isLoggedIn, function(req, res) {
		res.render('infrastructure.ejs', {
			title:{title:"Infrastructure"},
			user : req.user// get the user out of session and pass to template
		});
	});
	// =====================================
	// ABOUTUS SECTION ================
	// =====================================
	app.get('/aboutus', isLoggedIn, function(req, res) {
		res.render('aboutus.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//======================
	//=======Support links==
	//======================
	
	//MEIDA
	app.get('/media/logo.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'logo.png'));
	});
	app.get('/media/loginBanner.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'loginBanner.png'));
	});

	
	app.get('/media/sidebar.jpg',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'sidebar.jpg'));
	});

	app.get('/media/apple-icon.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'apple-icon.png'));
	});

	
	app.get('/media/favicon.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'favicon.png'));
	});

	app.get('/media/cm.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'cm.png'));
	});

	
	app.get('/media/minister.jpg',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'minister.jpg'));
	});


	//=======CSS=========
	app.get('/css/custom.css',function(req,res){
		res.sendFile(path.join(__dirname, 'css', 'custom.css'));
	});

	app.get('/css/materialize.min.css',function(req,res){
		res.sendFile(path.join(__dirname, 'css', 'materialize.min.css'));
	});
	
	app.get('/css/material-dashboard.css',function(req,res){
		res.sendFile(path.join(__dirname, 'css', 'material-dashboard.css'));
	});

	
	//=====JAVA SCRIPT=====
	
	app.get('/js/materialize.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'materialize.min.js'));
	});
	
	app.get('/js/materialize.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'materialize.js'));
	});
	
	app.get('/js/dashboard.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'dashboard.js'));
	});

	app.get('/js/jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'jquery.min.js'));
	});

	app.get('/js/core/jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/core', 'jquery.min.js'));
	});

	app.get('/js/core/popper.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/core', 'popper.min.js'));
	});

	app.get('/js/core/bootstrap-material-design.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/core', 'bootstrap-material-design.min.js'));
	});
	
	app.get('/js/plugins/perfect-scrollbar.jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'perfect-scrollbar.jquery.min.js'));
	});
	
	app.get('/js/plugins/chartist.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'chartist.min.js'));
	});

	app.get('/js/plugins/bootstrap-notify.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'bootstrap-notify.js'));
	});
	
	app.get('/js/material-dashboard.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'material-dashboard.js'));
	});
	
	app.get('/js/Chart.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'Chart.min.js'));
	});
	
	app.get('/js/Chart.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'Chart.js'));
	});

	//JS FILESW FOR HANDLING APIS
	app.get('/js/accesspoints.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'accesspoints.js'));
	});
	
	app.get('/js/dashboard.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'dashboard.js'));
	});
	
	app.get('/js/ui.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'ui.js'));
	});
	
	app.get('/js/institutions.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js','institutions.js'));
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}


