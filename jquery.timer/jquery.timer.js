/*
 *  Project: jQuery Timer Plugin v1.0.28
 *  Description: Flexible Placeholder for style manipulations and password input
 *  Author: Andrey Matin
 *  License: GPL v3
 *  16.06.2012
 */
 
(function($){
	var methods = {

		/**
		 * Init
		 */
		init : function(options) {

			var settings = $.extend({
				's': '', // Show Seconds
				'm': '', // Show Minutes
				'h': '', // Show Hours
				'timer': true, // Show Timer
				'pause_bt': '#pause-bt', // Show Custom Pause Button
				'stop_bt': '#stop-bt', // Show Custom Stop Button
				'start_bt': '#start-bt' // Show Custom Start Button
			}, options);

			return this.each(function(){
				var $obj = $(this),
					h = 0,
					m = 0, 
					s = 0, 
					t = null,
					t_is_on = false;
				
				/**
				 * Show Time
				 */
				showtime = function() {
					s++;
					if (s >= 60) {
						s = 0;
						m++;
						if (m >= 60) {
							m = 0;
							h++;
							if (h >= 24) h = 0;
						}
					}

					s = s + '';
					m = m + '';
					h = h + '';
					
					if (s.length < 2) s = '0' + s;
					if (m.length < 2) m = '0' + m;
					if (h.length < 2) h = '0' + h;

					/**
					 * Separate time objects by configuration parameter
					 */
					if (settings.s != '') $(settings.s).val(s);
					if (settings.m != '') $(settings.m).val(m);
					if (settings.h != '') $(settings.h).val(h);
					
					/**
					 * Insert time to timer object
					 */
					if (settings.timer) $obj.html(h + ':' + m + ':' + s);
				}

				/**
				 * Start
				 */
				timer_start = function() {
					if (! t_is_on ) {
						t = setInterval(function (){ showtime() }, 1000);
					}
					t_is_on = true;
				}
				
				/**
				 * Pause
				 */
				timer_pause = function() {
					clearTimeout(t);
					t_is_on = false;
					t = null;
				}
				
				/**
				 * Stop
				 */
				timer_stop = function() {
					h = '00', m = '00', s = '00';
					
					if (settings.timer) $obj.html(h + ':' + m + ':' + s);
					if (settings.s != '') $(settings.s).val(s);
					if (settings.m != '') $(settings.m).val(m);
					if (settings.h != '') $(settings.h).val(h);
					
					clearTimeout(t);
					t = null;
					t_is_on = false;
				}
				
				/**
				 * Buttons Functionality
				 */
				$(settings.pause_bt).click(function(){
					timer_pause();
				});

				$(settings.start_bt).click(function(){
					timer_start();
				});
				
				$(settings.stop_bt).click(function(){
					timer_stop();
				});	


			});
		},
		
		/**
		 * Destroy
		 */
		destroy: function() {
			this.each(function(){

				var $obj = $(this),
				data = $obj.data('timer');

				// Namespacing FTW
				$(window).unbind('.timer');
				data.timer.remove();
				$obj.removeData('timer');
			})
		}
	};	

	/**
	 * Constructor
	 */
	$.fn.timer = function(method) {
		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error();
		}
	};

})(jQuery);