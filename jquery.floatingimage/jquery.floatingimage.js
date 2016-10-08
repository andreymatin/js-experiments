/*!
	Floating Image jQuery Plugin
*/
$.fn.floatingPhoto = function(method, parameters)
{
	switch (method)
	{
		case 'start':
		{
			options = 
			{
				width:			600,
				height:			450,
				scopeMouseOver:	1.1,
				scopeMouseOut:	1.2,
				speedReturn:	200,
				speedMoving:	0.01,
				position:		0
			};
				
			if (parameters.width !=				undefined) options.width =			parameters.width;
			if (parameters.height !=			undefined) options.height =			parameters.height;
			if (parameters.scopeMouseOver !=	undefined) options.scopeMouseOver =	parameters.scopeMouseOver;
			if (parameters.scopeMouseOut !=		undefined) options.scopeMouseOut =	parameters.scopeMouseOut;
			if (parameters.speedReturn !=		undefined) options.speedReturn =	parameters.speedReturn;
			if (parameters.speedMoving !=		undefined) options.speedMoving =	parameters.speedMoving;
			
			startingPositionWidth =		options.width *		options.scopeMouseOut;
			startingPositionHeight =	options.height *	options.scopeMouseOut;
			startingPositionLeft =		options.width *		(options.scopeMouseOut - 1) * (-0.5);
			startingPositionTop =		options.height *	(options.scopeMouseOut - 1) * (-0.5);
			
			prepareToMoveWidth =	options.width *		options.scopeMouseOver;
			prepareToMoveHeight =	options.height *	options.scopeMouseOver;
			prepareToMoveLeft =		options.width *		(options.scopeMouseOver - 1) * (-0.5);
			prepareToMoveTop =		options.height *	(options.scopeMouseOver - 1) * (-0.5);
			
			$(this).css('overflow', 'hidden');
			$(this).css('width', options.width);
			$(this).css('height', options.height);
			$(this).children().css('position', 'relative');
			$(this).children().css('width', options.width);
			$(this).children().css('height', options.height);
			$(this).children().css('left', 0);
			$(this).children().css('top', 0);
			$(this).mouseover(function (pos)
			{
				$(this).floatingPhoto('positionCursor', pos);
				$(this).children().stop();
				$(this).floatingPhoto('prepareToMove');
			});
			$(this).mouseout(function ()
			{
				$(this).children().stop();
				$(this).floatingPhoto('returnToStartingPosition');
			});
					
			$(this).floatingPhoto('returnToStartingPosition');
			
			break;	
		}
		case 'returnToStartingPosition':
		{
			$(this).stopTime('timer');
			$(this).unbind('mousemove');
			$(this).children().animate(
			{
				width:	startingPositionWidth,
				height:	startingPositionHeight,
				left:	startingPositionLeft,
				top:	startingPositionTop
			},
			{
				duration:	options.speedReturn,
				easing:		'easeOutQuad'
			});
			break;
		}
		
		case 'prepareToMove':
		{
			$(this).children().animate(
			{
				width:	prepareToMoveWidth,
				height:	prepareToMoveHeight,
				left:	prepareToMoveLeft,
				top:	prepareToMoveTop
			},
			{
				duration:	options.speedReturn,
				easing:		'easeOutQuad',
				complete:	$(this).floatingPhoto('afterPrepareToMove')
			});
			break;
		}
		
		case 'afterPrepareToMove':
		{
			$(this).everyTime(25, 'timer', function ()
			{
				$(this).floatingPhoto('moveToCursor');
			});
			$(this).mousemove(function (pos)
			{
				$(this).floatingPhoto('positionCursor', pos);
			});
			break;
		}
		case 'moveToCursor':
		{
			leftValue =	parseFloat($(this).children().css('left')) -	options.speedMoving * (parseFloat($(this).children().css('left')) -	options.needLeft);
			topValue =	parseFloat($(this).children().css('top')) -		options.speedMoving * (parseFloat($(this).children().css('top')) -		options.needTop);
			$(this).children().css (
			{
				left:	leftValue,
				top:	topValue
			});
			break;
		}
	
		case 'positionCursor':
		{
			offset =	$(this).offset();
			cursorX =	parameters.pageX - offset.left;
			cursorY =	parameters.pageY - offset.top;
			options.needLeft =	cursorX * (-1) *(options.scopeMouseOver - 1);
			options.needTop =	cursorY * (-1) *(options.scopeMouseOver - 1);
			break;
		}
	}
};