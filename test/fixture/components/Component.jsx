var React = require('react');
var PropTypes = require('prop-types');

/**
 * General component description.
 */
var Component = React.createClass({
  displayName: 'Component',

  propTypes: {
    /**
     * Prop description
     */
    bar: PropTypes.number,
    /**
     *
     */
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /**
     * Footer
     */
    footer: PropTypes.oneOfType(['ss', 'xl']),
  },

  getDefaultProps: function() {
    return {
      bar: 21
    };
  },

  render: function() {
    // ...
  }
});

module.exports = Component;
