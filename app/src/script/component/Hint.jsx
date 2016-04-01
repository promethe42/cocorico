var React = require('react');
var ReactIntl = require('react-intl');
var ReactBootstrap = require('react-bootstrap');
var ReactCookie = require('react-cookie');
var ReactRouter = require('react-router');
var Reflux = require('reflux');

var Page = require('./Page'),
    PageTitle = require('./PageTitle');

var Link = ReactRouter.Link;

var Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col,
    Button = ReactBootstrap.Button,
    ButtonToolbar = ReactBootstrap.ButtonToolbar;

var Hint = React.createClass({

    mixins: [
        ReactIntl.IntlMixin
    ],

    getDefaultProps: function()
    {
        return {
            style: 'default',
            actionButtonClassName: 'btn-default',
            onActionButtonClick: null
        };
    },

    getInitialState: function()
    {
        return {
            hidden : ReactCookie.load('hint/' + this.props.pageSlug)
        };
    },

    buttonClickHandler: function(e)
    {
        var hidden = !this.state.hidden;

        this.setState({hidden : hidden});
        ReactCookie.save('hint/' + this.props.pageSlug, hidden);
    },

    render: function()
    {
        if (this.state.hidden)
        {
            return (
                <a onClick={this.buttonClickHandler}
                    className="btn-hint-show">
                    <span className="icon-info"/>
                    <PageTitle slug={this.props.pageSlug} className="hint-title"/>
                </a>
            );
        }

		return (
            <div className={'callout callout-' + this.props.style}>
                <div className="hint-content">
                    {this.props.pageSlug
                        ? <Page slug={this.props.pageSlug}/>
                        : this.props.children}
                </div>
                <ButtonToolbar>
                    {this.props.disposable
                        ? <Button bsStyle="link" onClick={this.buttonClickHandler}
                            className="btn-hint-hide">
                            {this.getIntlMessage('hint.HIDE_HINT_BUTTON')}
                        </Button>
                        : <span/>}
                    {this.props.actionButtonLabel && this.props.onActionButtonClick
                        ? <Button bsStyle={this.props.style}
                            onClick={this.props.onActionButtonClick}>
                            {this.props.actionButtonLabel}
                        </Button>
                        : <span/>}
                    {this.props.morePageSlug
                        ? <Link to={'/' + this.props.morePageSlug}>
                            <Button bsStyle="link">
                                {this.getIntlMessage('hint.LEARN_MORE_BUTTON')}
                            </Button>
                        </Link>
                        : <span/>}
                </ButtonToolbar>
            </div>
		);
	}
});

module.exports = Hint;
