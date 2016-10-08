/**
 * @title Vanilla Tabs
 * @description Simple tabs on pure JS (ES6)
 * @version 0.3
 * @author Andrey Matin
 * @date 02.10.2016
 */

(function() {
  let tabsExist = false;

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
  Tabs.getError = function (code, type = 0) {
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
    let tab = {
      errors : {},
      getError : function () {},
      init : function () {},
      linkClass : 'tab'
    };

    /**
     * Private Variables
     */

    // Selected object by Id
    let id = null;

    // Tab Links
    let links = [];

    // Tab Panels
    let panels = [];

    /**
     * Tab inititalization
     */
    function init(t = 'tabs') {
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
      setClick();

      return tab;
    }

    /**
     * Get links from tablist
     */
    function getLinks() {
      let linksClass = tab.linkClass;
      let links = id.getElementsByClassName(linksClass);

      if (links.length != 0) {
        return links;
      }

      return Tabs.getError(2);
    }

    /**
     * Set click event
     */
    function setClick() {
      for (let item of links) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          let obj = this;
          show(obj);
        });
      }
    }

    /**
     * Show active tab
     */
    function show(obj) {
      let a = obj.getElementsByTagName('a')[0];
      let href = a.getAttribute('href');

      if (href != null) {
        let idActive = href.replace('#', '');
        let tabActive = document.getElementById(idActive);
        reset();
        setActive(obj, tabActive);
      } else {
        Tabs.getError(3);
      }
    }

    /**
     * Reset active tab
     */
    function reset() {
      for (let item of links) {
        item.classList.remove('active');
        let a = item.getElementsByTagName('a')[0];
        let href = a.getAttribute('href');

        if (href != null) {
          let idActive = href.replace('#', '');
          let tabActive = document.getElementById(idActive);

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