/**
 * @title Vanilla Tabs
 * @description Simple tabs on pure JS (ES6)
 * @version 0.3
 * @author Andrey Matin
 * @date 02.10.2016
 */


;(() => {
  'use strict';

  // Check Tabs variable existing
  let tabsExist = false;

  if (typeof Tabs != 'undefined') {
    tabsExist = true;
  }

  // Init Tabs view
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
     * Class Tab
     */
    class Tab {

      /**
       * Constructor
       */
      constructor(t = 'tabs') {
        this.errors = Tabs.errors;
        this.getError = Tabs.getError;
        this.linkClass = 'tab';

        try {
          this.id = document.getElementById(t);

          if (this.id === null) {
            Tabs.getError(0);
            return false;
          }

        } catch (err) {
          Tabs.getError(0);
        }

        this.links = this.getLinks();
        this.setClick();
      }

      /**
       * Get links from tablist
       */
      getLinks() {
        let linksClass = this.linkClass;
        let links = this.id.getElementsByClassName(linksClass);

        if (links.length != 0) {
          return links;
        }

        return Tabs.getError(2);
      }

      /**
       * Set click event
       *
       * https://developer.mozilla.org/en-US/docs/Web/Events/click
       * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
       */
      setClick() {
        for (let item of this.links) {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.currentTarget;
            this.show(target);
          }, false);
        }
      }

      /**
       * Show active tab
       */
     show(item) {
        let a = item.getElementsByTagName('a')[0];
        let href = a.getAttribute('href');

        if (href != null) {
          let idActive = href.replace('#', '');
          let tabActive = document.getElementById(idActive);
          this.reset();
          this.setActive(item, tabActive);
        } else {
          Tabs.getError(3);
        }
      }

      /**
       * Reset active tab
       */
      reset() {
        for (let item of this.links) {
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
      setActive(obj, tabActive) {
        obj.classList.add('active');
        tabActive.classList.add('active');
      }
    }

    return Tab;
  }());

}).call(this);