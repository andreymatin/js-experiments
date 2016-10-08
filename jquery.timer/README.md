[jQuery Timer](https://github.com/andreymatin/jquery.timer) - Flexible jQuery Timer Plugin
==================================================

Stop/Start/Pause Functionality


HTML
---------------

```html
	<div class="timer-panel" id="timer-panel">
		<div id="timer"></div>
		<button class="pause-bt" id="ps-bt">Pause</button>
		<button class="start-bt" id="st-bt">Start</button>
		<button class="stop-bt" id="cl-bt">Stop</button>
	</div>
```

JS
--------------

```javascript
$(function(){
	$('#timer').timer();
});
```


Bower
-----

You can get the latest release using bower.

```ssh
bower install jquery.timer
```