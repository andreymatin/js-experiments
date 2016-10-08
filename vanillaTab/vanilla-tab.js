/**
 * @title Vanilla Tabs
 * @description Simple tabs on pure JS ((ES5)
 * @version 0.2
 * @author Andrey Matin
 * @date 02.10.2016
 */
;(function() {
  var tabsExist = false;

  if (typeof Tabs != 'undefined') {
    tabsExist = true;
  }

  var Tabs = {};

  /**
   * Errors List
   */
  Tabs.errors = {
    '0' : 'Vanilla Tabs: Initital id is absence',
    '1' : 'Vanilla Tabs: Namespace collision. Tabs is existed before initialization.',
    '2' : 'Vanilla Tabs: No links',
    '3' : 'Vanilla Tabs: Link is absence'
  };

  /**
   * Get Error by Code and Type
   */
  Tabs.getError = function (code, type) {
    type = (typeof type !== 'undefined') ?  type : 0;

    switch (type) {
      case 0:
        throw new Error(Tabs.errors[code]);
      default:
        console.warn(Tabs.errors[code]);
        break;
    }
  };

  /**
   * Show warning message if Tabs is existed before initialization
   */
  if (tabsExist) {
    Tabs.getError(1, 1);
  }

  /**
   * Tabs Module
   * and private properties
   */
  this.Tabs = (function() {

    /**
     * Sceleton
     */
    var tab = {
      errors : {},
      getError : function () {},
      init : function () {},
      linkClass : 'tab'
    };

    /**
     * Private Variables
     */

    // Selected object by Id
    var id = null;

    // Tab Links
    var links = [];

    var linksLength = 0;

    // Tab Panels
    var panels = [];

    /**
     * Tab inititalization
     */
    function init(t) {
      t = (typeof t !== 'undefined') ?  t : 'tabs';

      try {
        id = document.getElementById(t);

        if (id === null) {
          Tabs.getError(0);
          return false;
        }

      } catch (err) {
        Tabs.getError(0);
      }

      links = getLinks();
      linksLength = links.length;
      setClick();

      return tab;
    }

    /**
     * Get links from tablist
     */
    function getLinks() {
      var linksClass = tab.linkClass;
      var tabLinks = id.getElementsByClassName(linksClass);

      if (tabLinks.length != 0) {
        return tabLinks;
      }

      Tabs.getError(2);
    }

    /**
     * Set click event
     */
    function setClick() {
      for (var i = 0; i < linksLength; i++) {

        /**
         * Toggle tabs on Click
         */
        links[i].addEventListener('click', function (e) {
          e.preventDefault();
          var obj = this;
          show(obj);
        });

      }

    }

    /**
     * Show active tab
     */
    function show(obj) {
      var a = obj.getElementsByTagName('a')[0];
      var href = a.getAttribute('href');

      if (href != null) {
        var idActive = href.replace('#', '');
        var tabActive = document.getElementById(idActive);
        reset();
        setActive(obj, tabActive);

        return true;
      }

      return Tabs.getError(3);
    }

    /**
     * Reset active tab
     */
    function reset() {
      for (var i = 0; i < linksLength; i++) {
        links[i].classList.remove('active');
        var a = links[i].getElementsByTagName('a')[0];
        var href = a.getAttribute('href');

        if (href != null) {
          var idActive = href.replace('#', '');
          var tabActive = document.getElementById(idActive);

          if (typeof tabActive !== 'undefined' && tabActive !== null) {
            tabActive.classList.remove('active');
          }
        }
      }
    }

    /**
     * Set tab as active
     */
    function setActive(obj, tabActive) {
      obj.classList.add('active');
      tabActive.classList.add('active');
    }

    /**
     * Add public properties
     */
    tab.errors = Tabs.errors;
    tab.getError = Tabs.getError;
    tab.init = init;

    return tab;
  }());

}).call(this);