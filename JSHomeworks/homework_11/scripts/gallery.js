function Gallery(sSelector) {
	// ***************** свойства ******************* //
	let g = this;
	g.init(sSelector);
	g.pictures               = g.findObj('.picture');
	g.displayCurrent         = g.findObj('.display');
	g.displayNext            = g.findObj('.display2');
	g.buttonMain             = g.findObj('.button_start');
	g.buttonNext             = g.findObj('.button_next');
	g.buttonPrev             = g.findObj('.button_prev');
	g.buttonS                = g.findObj('.button');
	g.displayInfo            = g.findObj('.display_info');
	g.prevObject             = '';
	g.startPosition          = 0;
	g.imageMaxPosition       = 5;
	g.currentImage           = '';
	g.nextImage              = '';
	g.prevImage              = '';
	g.maxCount               = 21;
	g.backgroundSize         = '100% 100%';
	//Признак того что работает setInterval()
	g.slideshowIntervalStart = null;
	// признак запуска слайдшоу
	g.slideshowStart         = false;
	g.slideshowFirstStart    = true;
	g.firstClickNext         = true;
	g.firstClickPrev         = true;
	g.timeAnim               = 3 * 1000;
	
	// ******************* методы ******************* //
	g.startInit = function () {
		g.currentImage = 'url(\'../images/gallery/0.JPG\')';
		g.setNumberQueue();
		g.displayCurrent.css({
			                     'background-image': g.currentImage,
			                     'background-size': g.backgroundSize
		                     });
		g.setDisplayInfoText();
	};
	g.rotation  = function () {
		g.checkEndLength(g.returnCurrentNumber(g.currentImage));
		g.changeImageCurrent(g.displayCurrent).animate({
			                                               opacity: 0.0
		                                               }, g.timeAnim);
		g.changeImageNext(g.displayNext).animate({
			                                         opacity: 1.0
		                                         }, g.timeAnim);
		g.currentImage = g.nextImage;
		g.setNumberQueue();
		g.setDisplayInfoText();
	};
	
	g.changeImageCurrent = function (oObject) {
		oObject.css({
			            'background-image': g.currentImage,
			            'background-size': g.backgroundSize,
			            opacity: 1.0,
			            'z-index': 0
		            });
		return oObject;
	};
	g.changeImageNext    = function (oObject) {
		oObject.css({
			            'background-image': g.nextImage,
			            'background-size': g.backgroundSize,
			            opacity: 0.0,
			            'z-index': 0
		            });
		return oObject;
	};
	
	g.show                = function () {
		if (g.slideshowStart){
			g.stopSlideshow();
		}
		else{
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
			       g.maxCount + 1
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
		if (iNumb >= g.maxCount + 1){
			iNumb = 0;
		}
		else if (iNumb < 0){
			iNumb = g.maxCount;
		}
		return iNumb;
	};
	g.displayImage        = function (sCurrentPatch) {
		g.displayCurrent.css({
			                     'background-image': sCurrentPatch,
			                     'background-size': g.backgroundSize,
			                     opacity: 1.0,
			                     'z-index': 1000
		                     });
		g.currentImage = sCurrentPatch;
	};
	g.returnCurrentNumber = function () {
		return n = parseInt(g.currentImage.replace(/\D+/g, ''));
	};
	g.setNumberQueue      = function () {
		let currentNext,
		    currentPrev;
		currentNext = currentPrev = g.returnCurrentNumber(g.currentImage);
		g.nextImage = 'url(\'../images/gallery/' + g.checkEndLength(++currentNext) + '.JPG\')';
		g.prevImage = 'url(\'../images/gallery/' + g.checkEndLength(--currentPrev) + '.JPG\')';
	};
	g.dropOpacityPrev     = function () {
		g.prevObject = g.displayCurrent;
		g.prevObject.css({opacity: 0.0, 'z-index': -1});
		g.displayNext.css({opacity: 0.0, 'z-index': -1});
	};
	g.galleryEvents       = function () {
		// console.info(event.which, event.altKey, event.ctrlKey, event.shiftKey);
		if ((
			    event.which == 32
		    ) && (
			    event.ctrlKey
		    )){
			if (!g.slideshowStart){
				g.show();
			}
			else{
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
		g.buttonS.css({'color': 'rgba(255, 255, 255, 0.582)'});
		oButton.css({'color': 'rgb(0, 196, 0)'});
	};
	g.wait                = function (ms) {
		let d  = new Date();
		let d2 = null;
		do { d2 = new Date(); }
		while (d2 - d < ms);
	};
	g.startInit();
	// ******************* события ******************* //
	g.buttonMain.click(g.show);
	g.buttonPrev.click(g.showPreviousImage);
	g.buttonNext.click(g.showNextImage);
	$('body').keyup(g.galleryEvents);
}

Gallery.prototype = new Component();
