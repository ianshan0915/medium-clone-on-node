import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    getArticle, 
    clap,
    follow
} from './../redux/actions/actions'
import PropTypes from 'prop-types'
import FollowButton from './FollowButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mapStateToProps = state => {
    return {
        _article: state.articles.article,
        user: state.authUser.user
    }
}

class ArticleView extends Component {
    componentDidMount() {
        document.body.className = 'posts show'
    }

    componentWillMount() {
        this.props.getArticle(this.props.match.params.id)
    }    

    componentWillUnmount() {
        document.body.className = ''
    }

    render() {
        const { text, claps, title, feature_img, owner } = this.props._article
        let owner_name, owner_type, owner_id
        let related_papers = []
        let keywords = []
        if (owner) {
            const { name, type, _id } = owner
            owner_name = name
            owner_id = _id
            owner_type = type 
            related_papers = this.props._article.articles
            keywords = this.props._article.keywords
        }
        return ( 
            <div>
                <div className="container-fluid main-container">
                    <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                        <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">

                        <div className="pull-right">
                            {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${owner_id}`} /> : ''}
                        </div>

                        <div className="post-metadata">
                            {/* <img alt={owner_name} className="avatar-image" src="" height="40" width="40" /> */}
                            <div className="post-info">
                                <div data-react-className="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}"><span className="popover-link" data-reactroot=""><a href={`/profile/${owner_id}`}>{owner_name}</a></span></div>
                                {/* <small>Published • nice story</small> */}
                            </div>
                        </div>


                        {!feature_img || !feature_img.length > 0 ? '' : <div className="post-picture-wrapper">
                            <img src={feature_img} alt="feature img 540" />
                        </div> }

                        <h3 className="title">{title}</h3>
                        <div className="body">
                            <p></p>
                            <p className=""dangerouslySetInnerHTML={{__html: text}}>
                            </p>
                            <p></p>
                        </div>

                        <div className="post-tags">
                            { 
                                keywords.map((keyword) => 
                                <a className="tag" href=""> { keyword }</a>
                                )                                
                             }
                        </div>

                        <div className="post-stats clearfix">
                            <div className="pull-left">
                                <div className="like-button-wrapper">
                                    <button onClick={() => this.props.clap(this.props._article._id)} className="like-button" data-behavior="trigger-overlay">
                                        <FontAwesomeIcon icon={['far', 'heart']} /><span className="hide-text">Like</span>
                                    </button>
                                     <span className="like-count">{claps}</span>
                                </div>
                            </div>
                            <div className="pull-left">
                                <a className="response-icon-wrapper" href="#">
                                    <FontAwesomeIcon icon={['far', 'comment']} />
                                    <span className="response-count" data-behavior="response-count">0</span>
                                </a>
                            </div>

                            <div className="pull-right">
                                <div className="bookmark-button-wrapper">
                                    <form className="button_to" method="get" action="">
                                        <button className="bookmark-button" data-behavior="trigger-overlay" type="submit"> 
                                            <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span>
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                    </div>

                    <div className="post-show-footer row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                    <div className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-2 main-content related-stories">
                        <h4 className="small-heading">Related papers</h4>
                            {
                                related_papers.map((_paper) => 
                                    <div className="post-list-item">
                                        <div className="flex-container">
                                            <div className="avatar-wrapper">
                                                <a href={`/editor/${this.props._article._id}/${_paper._id}`}><FontAwesomeIcon icon={['far', 'edit']} /></a>
                                            </div>
                                            <div className="post-info">
                                                <strong className="pli-title"><a href={_paper.url_pdf} target="_blank">{_paper.title}</a></strong><br/>
                                                <small className="pli-username"><a href={_paper.url} target="_blank">{_paper.text}</a></small>
                                            </div>
                                        </div>
                                    </div>
                                )                                
                            }
                    </div>
                    </div>
                </div>

            </div>
        );
    }
}
ArticleView.propTypes = {
    params: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { 
    getArticle,
    clap,
    follow
})(ArticleView);