(function($) {
	$(document).ready(function() {
		var
		menu = $("#menu"),
		mask = $("#mask"),
		carrusel = $("#carrusel"),
		lista = $("#carrusel ul")
		$.ajax({
			url: 'http://www.eso.org/public/spain/images/potw/feed/',
			type: 'GET',
			dataType: 'xml',
			success: function(xml) {
				$(xml).find('item').each(function(i) {
					var
					titulo = $(this).find('title').text(),
					miniImg  = $(this).find('enclosure').attr('url').replace('screen', 'news')
					carrusel.find('ul').append(
					$('<li>').attr('No', i).attr('title', titulo).css('background-image', 'url('+miniImg+')')
					.append(
					$('<p>').text(titulo)
					)
					.bind('click', cargarImagen)
					)
				})
				$('#carrusel ul').mCustomScrollbar({
					axis: 'x',
					advanced: {
						autoExpandHorizontalScroll: true
					}
				})
			}
		})
		
		mask.click(maskClick)
		
		$('#toggleMenu').click(function(e) {
			e.preventDefault()
			menu.fadeIn().delay(500).toggleClass('Desactivado')
			$(this).toggleClass('oculto')
			mask.bind('click', maskClick)
		})
	}) //fin ready()
	
	function maskClick() {
		$('#menu').toggleClass('Desactivado').delay(500).fadeOut()
		$('#toggleMenu').toggleClass('oculto')
		$(this).unbind('click')
	}
	
	function cargarImagen() {
		var num = $(this).attr('No')
		$.ajax({
			url: 'http://www.eso.org/public/spain/images/potw/feed/',
			type: 'GET',
			dataType: 'xml',
			success: function(xml) {
				$(xml).find('item').each(function(i) {
					if(i == num) {
						var imgUrl = $(this).find('enclosure').attr('url')
						var desc   = $(this).find('description').text()
						var titulo = $(this).find('title').text()
						var linkESO = $(this).find('guid').text()
						var zoom = linkESO + 'zoomable/';
						var original = linkESO.replace('spain', 'archives').replace('images', 'images/original').replace('a/', 'a.tif')
						$('#Imagen img').attr('src', imgUrl)
						$('#Descripcion').html(desc)
						$('#Titulo h1').text(titulo)
						$('.permalink').attr('href', linkESO)
						$('.zoom').attr('href', zoom)
						$('.original').attr('href', original)
						return false
					}
				})
			}
		})
		$('#menu').toggleClass('Desactivado').delay(500).fadeOut()
		$('#toggleMenu').toggleClass('oculto')
	} //fin cargarImagen()
	
	$(document).ajaxComplete(function() {
		$('#load').fadeOut(1000).parent().removeClass()
	}).ajaxStart(function() {
		$('body').addClass('cargando').find('#load').fadeIn()
	})
})(jQuery);