jQuery(function($){
    if (!$('.video-container').length ) return false;
    
    var $v1 = $('video#left')[0],
        // $v2 = $('video#right')[0],
        $duration1 = $v1.duration; // Video Duration
        // $duration2 = $v2.duration;

    if(!$(window).width() > 992){
        $('.open-video').on('click', function() {
            $('.video-popup').addClass('active').find('.iframe-container').append('<iframe src="'+$(this).data('youtube')+'" allowfullscreen></iframe>');
            return false;
        });

        $('.append-play-button .play-button').on('click', function(){
            $(this).parent().toggleClass('active');
        });
    }
    else{
        $v1.onloadedmetadata = function() {
            $duration1 = $v1.duration;
        };

        // $v2.onloadedmetadata = function() {
        //     $duration2 = $v2.duration;
        // };

        $('.open-video.left').on('click', function() {
            // $('.video-entry.right').hide();
            // $v2.pause();
            // $v2.currentTime = 0;
            $('.video-entry.left').show();
            $v1.play();
            // $('body, html').animate({'scrollTop':'0'}); 
            $(this).closest('.video-container').addClass('active play');
            $(this).addClass('active');
            $('.open-video.right').removeClass('active');
        });

        // $('.open-video.right').on('click', function() {
        //     $('.video-entry.left').hide();
        //     $v1.pause();
        //     $v1.currentTime = 0;
        //     $('.video-entry.right').show();
        //     // $v2.play();
        //     $('body, html').animate({'scrollTop':'0'}); 
        //     $(this).closest('.video-container').addClass('active play');
        //     $(this).addClass('active');
        //     $('.open-video.left').removeClass('active');
        // });

        $('.append-play-button .play-button').on('click', function(){
            $(this).parent().toggleClass('active');
            if($('.video-container').hasClass('active')) $('.open-video.active').click();
        });

        $('.video-container .pause-layer').on('click', function(){
            $('.play-stop').toggleClass('active');
            $('.video-container').toggleClass('play');

            if ( !$('.video-container').hasClass('play') ) {
                $v1.pause();
            } else {
                $v1.play();
            }
            // else $v2.pause();
        });

        $('.video-container .stop-button').on('click', function(){
            $('.video-container').removeClass('active play');
            $v1.pause();
            $v1.currentTime = 0;
            // $v2.pause();
            // $v2.currentTime = 0;
            $('.append-play-button, .open-video').removeClass('active');
        });

        $('.video-container .mute').on('click', function(){
            if(!$(this).hasClass('active')) {
                $v1.muted = true;
                // $v2.muted = true;
            }
            else {
                $v1.muted = false;
                // $v2.muted = false;
            }
            $(this).toggleClass('active');
        });

        $v1.ontimeupdate = function() {
            $('.video-container .handler').css({'left':parseInt(($v1.currentTime/$duration1)*100, 10)+'%'});
        };

        // $v2.ontimeupdate = function() {
        //     $('.video-container .handler').css({'left':parseInt(($v2.currentTime/$duration2)*100, 10)+'%'});
        // };

        $('.video-container .progress-bar-wrapper').on('click', function(e){
            $('.video-container .handler').addClass('notransition');
            var currentVideo = ($('.video-entry.left').is(':visible'))?$v1:$v1,
                currentDuration = ($('.video-entry.left').is(':visible'))?$duration1:$duration2,
                currentPageX = e.pageX;
                containerWidth = $('.video-container').width();
                if(currentPageX<33) currentPageX = 0;
                else if(currentPageX>(containerWidth-33)) currentPageX = containerWidth - 33;

            currentVideo.currentTime = parseInt(currentDuration*(e.pageX/containerWidth), 10);
        });
    }
});