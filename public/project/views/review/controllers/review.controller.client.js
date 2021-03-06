(function () {
    angular
        .module('project')
        .controller('reviewController', reviewController);

    function reviewController(reviewService, userService, currentUser) {

        var model = this;

        model.userID = currentUser._id;
        model.user = currentUser;
        model.sendData = sendData;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.submit = submit;
        model.logout = logout;
        model.admin = "ADMIN";
        model.getDateFormat = getDateFormat;
        // console.log(model.userID);

        function getDateFormat(date) {
            var d = date.slice(0, 10).split('-');
            var newDate = (d[1] +'/'+ d[2] +'/'+ d[0]);
            return newDate;

        }

        function submit(review) {
            model.rev = review;
            userService
                .findUserById(model.userID)
                .then(function (user) {
                    model.user = user;
                    model.rev.movieID = user._id;
                    model.rev.moviename = "Batman Begins";
                    model.rev.user_name = user.username;
                    model.rev.userID = user._id;
                    reviewService
                        .createReview(review, model.userID)
                        .then(function (newReview) {
                            init();
                            model.rev.description = ""
                        });
                })

        }

        function deleteReview(review) {
            reviewService
                .deleteReview(review)
                .then(function () {
                    init();
                })
        }

        function updateReview(review) {
            model.newRev = review;
            reviewService
                .updateReview(model.newRev._id, model.newRev)
                .then(function () {
                    init();
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

        function sendData(review) {
            model.rev = review;
        }

        function init() {
            reviewService
                .findAllReviews(model.userID)
                .then(function (reviews) {
                    model.reviews = reviews.data;
                    // console.log(model.reviews)
                });
        }
        init();







    }
})();