$().ready(function() {

	/**
	 * CodeMirror
	 */
	var code_type = '';
	$('.code').each(function(index) {
		$(this).attr('id', 'code-' + index);
		CodeMirror.fromTextArea(document.getElementById('code-' + index), {
				mode: "javascript",
				lineNumbers: true,
				tabMode: "indent"
			}
		);

	});

	/**
	 * Default
	 */
	$('#form_1 [placeholder]').placeholder();

	/**
	 * Predefined placeholder value
	 */	
	$('#input_phone').placeholder({
		'ph_val' : 'Phone number'	
	});
	
	$('#input_email').placeholder({
		'class_name' : 'placeholder_email',
		'attribute' : 'rel'	
	});
	
	$('#input_url').placeholder({
		'class_name' : 'placeholder_url',
		'attribute' : 'title'	
	});
	
	$('#input_pass, #text_area').placeholder('label');
	
	$('#form_name5 #input_name').placeholder('label',{
		'effect': {
			'type': 'fade'
		}
	});

	$('#form_name6 #input_name').placeholder('label',{
		'effect': {
			'type': 'opacity',
			'value': 0.5
		}
	});

});