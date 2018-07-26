function Gallery(sSelector) {
	// ***************** свойства ******************* //
	let g = this;
	g.init(sSelector);
	g.displayCurrent         = g.findObj('.display');
	g.buttonMain             = g.findObj('.button_start');
	g.buttonNext             = g.findObj('.button_next');
	g.buttonPrev             = g.findObj('.button_prev');
	g.buttonS                = g.findObj('.button');
	g.displayInfo            = g.findObj('.display_info');
	g.firstObj               = g.createObjDiv('firstObj');
	g.secondObj              = g.createObjDiv('secondObj');
	g.prevObject             = '';
	g.startPosition          = 0;
	g.imageMaxPosition       = 21;
	g.currentImage           = '';
	g.nextImage              = '';
	g.prevImage              = '';
	g.currentNext            = 0;
	g.currentPrev            = 0;
	//Признак того что работает setInterval()
	g.slideshowIntervalStart = null;
	// признак запуска слайдшоу
	g.slideshowStart         = false;
	let music                = new Audio();
	music.src                = '../audio/Alize_Mon_maquis.mp3';
	// ******************* настройки ******************* //
	g.timeAnim               = 3 * 1000;
	g.backgroundSize         = '100% 100%';
	g.height                 = '500px';
	g.width                  = '500px';
	// ******************* методы ******************* //
	g.startInit              = function () {
		g.addObjToPage();
		g.currentImage = 'url(\'../images/gallery/0.JPG\')';
		g.setNumberQueue();
		g.initObj();
		g.setDisplayInfoText();
	};
	g.addObjToPage           = function () {
		g.displayCurrent.append(g.firstObj, g.secondObj);
	};
	g.initObj                = function () {
		g.firstObj.css({
			               'background': g.currentImage,
			               'background-size': g.backgroundSize,
			               'opacity': 1.0,
			               'height': g.height,
			               'width': g.width,
			               'position': 'relative'
		               });
		g.secondObj.css({
			                'background': g.nextImage,
			                'background-size': g.backgroundSize,
			                'opacity': 0.0,
			                'height': g.height,
			                'width': g.width,
			                'position': 'absolute',
			                'top': 0
		                });
		
	};
	g.rotation               = function () {
		g.checkEndLength(g.returnCurrentNumber(g.currentImage));
		g.changeImageCurrent(g.firstObj).animate({'opacity': 0.0}, g.timeAnim);
		g.changeImageNext(g.secondObj).animate({'opacity': 1.0}, g.timeAnim);
		g.currentImage = g.nextImage;
		g.setNumberQueue();
		g.setDisplayInfoText();
	};
	
	g.changeImageCurrent = function (oObject) {
		oObject.css({
			            'background-image': g.currentImage,
			            'background-size': g.backgroundSize,
			            'opacity': 1.0
		            });
		return oObject;
	};
	g.changeImageNext    = function (oObject) {
		oObject.css({
			            'background-image': g.nextImage,
			            'background-size': g.backgroundSize,
			            'opacity': 0.0
		            });
		return oObject;
	};
	
	g.show                = function () {
		if (g.slideshowStart){
			music.pause();
			g.stopSlideshow();
		}
		else{
			music.play();
			g.setSlideshowData('stop', true);
			g.setDisplayInfoText('Слайдшоу запущено');
			g.addButtonBacklight(g.buttonMain);
			g.rotation();
			g.slideshowIntervalStart = setInterval(g.rotation, g.timeAnim * 2);
		}
	};
	g.stopSlideshow       = function () {
		g.setSlideshowData('start', false);
		clearInterval(g.slideshowIntervalStart);
		g.setDisplayInfoText('Слайдшоу остановлено');
	};
	g.setSlideshowData    = function (btnText, slideshowStart) {
		g.buttonMain.text(btnText);
		g.slideshowStart = slideshowStart;
	};
	g.setDisplayInfoText  = function (sStr) {
		if (!sStr){
			sStr = (
			       g.returnCurrentNumber(g.currentImage) + 1
			       ) + ' изображение из ' + (
			       g.imageMaxPosition + 1
			       );
		}
		g.displayInfo.text(sStr);
	};
	g.showNextImage       = function () {
		g.dropOpacityPrev();
		g.displayImage(g.nextImage);
		g.setDisplayInfoText();
		if (g.slideshowStart){
			g.stopSlideshow();
		}
		g.setNumberQueue();
		g.addButtonBacklight(g.buttonNext);
	};
	g.showPreviousImage   = function () {
		g.dropOpacityPrev();
		g.displayImage(g.prevImage);
		g.setDisplayInfoText();
		if (g.slideshowStart){
			g.stopSlideshow();
		}
		g.setNumberQueue();
		g.addButtonBacklight(g.buttonPrev);
	};
	g.checkEndLength      = function (iNumb) {
		if (iNumb >= g.imageMaxPosition + 1){
			iNumb = g.startPosition;
		}
		else if (iNumb < g.startPosition){
			iNumb = g.imageMaxPosition;
		}
		return iNumb;
	};
	g.displayImage        = function (sCurrentPatch) {
		g.firstObj.css({
			               'background-image': sCurrentPatch,
			               'background-size': g.backgroundSize,
			               opacity: 1.0
		               });
		g.currentImage = sCurrentPatch;
	};
	g.returnCurrentNumber = function () {
		return n = parseInt(g.currentImage.replace(/\D+/g, ''));
	};
	g.setNumberQueue      = function () {
		g.currentNext = g.currentPrev = g.returnCurrentNumber(g.currentImage);
		g.nextImage = 'url(\'../images/gallery/' + g.checkEndLength(++g.currentNext) + '.JPG\')';
		g.prevImage = 'url(\'../images/gallery/' + g.checkEndLength(--g.currentPrev) + '.JPG\')';
	};
	g.dropOpacityPrev     = function () {
		g.prevObject = g.firstObj;
		g.prevObject.css({
			                 opacity: 0.0
		                 });
		g.secondObj.css({
			                opacity: 0.0
		                });
	};
	g.galleryEvents       = function () {
		if ((
			    event.ctrlKey
		    ) && (
			    event.which == 32
		    )){
			if (!g.slideshowStart){
				g.show();
			}
			else if ((
				         event.ctrlKey
			         ) && (
				         event.which == 32
			         )){
				g.stopSlideshow();
			}
		}
		if (event.which === 37){
			g.showPreviousImage();
		}
		if (event.which === 39){
			g.showNextImage();
		}
	};
	g.addButtonBacklight  = function (oButton) {
		g.buttonS.css({
			              'color': 'rgba(255, 255, 255, 0.582)'
		              });
		oButton.css({
			            'color': 'rgb(0, 196, 0)'
		            });
	};
	g.startInit();
	// ******************* события ******************* //
	g.buttonMain.click(g.show);
	g.buttonPrev.click(g.showPreviousImage);
	g.buttonNext.click(g.showNextImage);
	$('body').keyup(g.galleryEvents);
}

Gallery.prototype = new Component();
