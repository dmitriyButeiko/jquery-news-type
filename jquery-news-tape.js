(function($){
    var
        options   =   {},
        self      =   {},
        container =   {};
    $.fn.createNewsTape = init;
    function customizeTypeBlock() {
        self.css({
            'position'         : 'fixed',
            'width'            : 'auto',
            'overflow-x'       : 'hidden',
            'word-wrap'        : 'break-word',
            'white-space'      : 'nowrap',
            'z-index'          : '1'
        });

        var additionalTop = parseInt( self.css( 'padding-top' ) ) + parseInt( self.css( 'padding-bottom' ) );

        self.css({
            'top' : ((window.innerHeight - self.height())-additionalTop) + 'px'
        });
    }
    function putTypeToStart()
    {
        self.css({
            left : window.innerWidth + 'px'
        });
    }




    /*
            the creation of this block prevents the copying of news text
     */
    function createCoverBlock() {
        var coverBlock = $( '<div></div>' );

        coverBlock.css({
            'position'         : 'fixed',
            'top'              : self.css('top'),
            'width'            : '100%',
            'height'           : self.css('height'),
            'background-color' : self.css('background-color'),
            'opacity'          : '0.0',
            'z-index'          : '2'
        });

        $('body').append( coverBlock );
        container.coverBlock = coverBlock;
    }
    function createBackgroundBlock()
    {
        var backgroundBlock  = $('<div></div>');
        backgroundBlock.css({
            'position'         : 'fixed',
            'top'              : self.css('top'),
            'width'            : '100%',
            'height'           : self.css('height'),
            'background-color' : self.css('background-color'),
            'z-index'          :'0'
        });
        $('body').append( backgroundBlock );
        container.backgroundBlock = backgroundBlock;
    }
    function addResizeHandler()
    {
        $( window ).on('resize', function()
        {
            var additionalTop = parseInt( self.css('padding-top') ) + parseInt( self.css('padding-bottom') );

            self.css({
                'top' : ((window.innerHeight - self.height())-additionalTop) + 'px'
            });
            container.coverBlock.css({
                'top'    : self.css('top'),
                'height' : self.css('height')
            });
            container.backgroundBlock.css({
                'top'    : self.css('top'),
                'height' : self.css('height')
            });
        });
    }
    /*
         launch animation
     */
    function startMove()
    {
        var left = (self.width() + window.innerWidth);

        self.animate({
            left :   '-=' + left
        }, options.rate, function(){
            putTypeToStart();
            startMove();
        });
    }
    function initOptions(inpOptions)
    {
        options = $.extend({
                       rate : 20000
                  },
                  inpOptions);
    }
    function createUI() {
        customizeTypeBlock();
        createBackgroundBlock();
        createCoverBlock();
    }













    function init(inpOptions)
    {
        self = this;
        initOptions(inpOptions);
        createUI();
        putTypeToStart();
        addResizeHandler();
        startMove();
    }



})(jQuery);