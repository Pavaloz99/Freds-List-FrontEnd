import React, { Component } from 'react';
import PostModel from '../models/Posts';
import DeleteConfModal from '../components/modals/DeleteConfModal';
import UserModel from '../models/User';
import './PostShow.css';
import UpdatePostModal from '../components/modals/UpdatePostModal';



class PostShow extends Component {

    state = {
        post: null,
        liked: false,
        disliked: false,
        likedHasChanged: false,
    }


    componentDidMount = () => {
        this.fetchData(this.props.match.params.id);
        this.grabCurrentUser();
    }
        
    grabCurrentUser = () => {
        UserModel.fetch().then(data => {
            this.setState({
                currentUser: data,
            });
        }).catch(err => {
            console.log(err);
        });
    }

    likeFromStart = () => {
        if(this.props.currentUser.hasLiked.includes(this.state.post.User._id.toString())){
            console.log('hi')
            this.setState({
                liked: true,
                disliked: false,
            });
        } else if(this.props.currentUser.hasDisliked.includes(this.state.post.User._id.toString())) {
            this.setState({
                liked: false,
                disliked: true,
            });
        }
    }

    // fetchCurrentUser = () => {
    //     UserModel.fetch().then(data => {
    //         this.setState({currentUser: data});
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.likedHasChanged !== prevState.likedHasChanged){
            this.fetchData(this.props.match.params.id);
            this.grabCurrentUser();
        }
    }

    fetchData = (id) => {
         PostModel.fetchOne(id).then(res => {
            console.log(res)
            this.setState({
                post: res.post,
            });
            console.log(this.state)
        }).catch(err => {
            console.log(err);
        });
    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
                return window.btoa(binary);
    };
    
    handleDelete = (id) => {
        PostModel.drop(id).then(res => {
            console.log(res);
            this.props.history.push('/listings');
        }).catch(err => {
            console.log(err);
        });
      }
    
      handleSubmitPositive = (e) => {
          e.preventDefault();
          UserModel.addLike(this.state.post.User._id).then(res => {
              console.log(res);
              this.setState({
                  likedHasChanged: !this.state.likedHasChanged,
                  liked: true,
                  disliked: false,
              });
          }).catch(err => {
              console.log(err);
          });
        }
        handleSubmitNegative = (e) => {
            e.preventDefault();
            UserModel.addDislike(this.state.post.User._id).then(res => {
                this.setState({
                    likedHasChanged: !this.state.likedHasChanged,
                    liked: false,
                    disliked: true,
                });
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
          }

          handleSubmitFollow = (e) => {
            e.preventDefault();
            UserModel.follow(this.state.post.User._id).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
          }



    render(){

        const iconStyles = {
            fontSize: "36px",
            cursor: "pointer",
        }

        const iconStylesPos = {
            fontSize: "46px",
            color: "green",
            cursor: "pointer"
        }

        const iconStylesNeg = {
            fontSize: "46px",
            color: "red",
            cursor: "pointer"
        }

    return( // split this return into two components maybe three
            <main className="main-post-show">{this.state.post && this.state.currentUser ? 
             <>
            <h1 className="title-post-show">{this.state.post.title}</h1>
            <div className="row-info">
                    <img src={"data:image/jpeg;base64," + this.arrayBufferToBase64(this.state.post.image.data)} alt="something"></img>
                <div className="item-info">
                    <h2 className="description">Description:<span>{" " + this.state.post.description}</span></h2>
                    <div className="bottom-content">
                    <div>
                        <h2>Asking:</h2>
                        <p>{" " + this.state.post.asking}</p>
                    </div>
                        <div>
                        <h2>Condition:</h2>
                    <p>{" " + this.state.post.condition}</p>
                    </div>                   
                    { this.props.currentUser && this.props.currentUser._id.toString() === this.state.post.User._id.toString() ?
                    <DeleteConfModal className="delete-btn" handleDelete={this.handleDelete} id={this.props.match.params.id} /> :
                    <button className="message-seller">Message The Seller</button>
                    } 
                    </div>
                    </div> 
            </div>
            <div className="row-user-more">
                <div className="user">
                <h1>About The Seller</h1>
                <h3>Username: {" " + this.state.post.User.username}</h3>
                <h3>Rating: {this.state.post.User.Rating.length ? 
                        Math.round((this.state.post.User.Rating.reduce((accumulator, currentValue) => 
                        accumulator + currentValue)/this.state.post.User.Rating.length)*100) + "%" :
                         "0%"} </h3>
                <h3>Location: </h3>
                <h3>Followers: {" " + this.state.post.User.Followers.length}</h3>
                {this.props.currentUser && (this.props.currentUser._id.toString() === this.state.post.User._id.toString()) ?
                <>
                <UpdatePostModal postId={this.state.post._id} post={this.state.post} /></> :
                
                <>
                <i className="fa fa-thumbs-o-up" style={this.state.currentUser.hasLiked.includes(this.state.post.User._id.toString()) ? iconStylesPos : iconStyles} onClick={this.handleSubmitPositive}></i>
                <i className="fa fa-thumbs-o-down" style={this.state.currentUser.hasDisliked.includes(this.state.post.User._id.toString()) ? iconStylesNeg : iconStyles} onClick={this.handleSubmitNegative}></i>
                <button className="follow" onClick={this.handleSubmitFollow}>Follow</button>
                </>
                }
                </div>
                <div className="carausel">

                </div>
            </div>
            </> :
             <h1 className="auth-error">Please Sign In To view Post</h1>}
            </main>
    );
    }
}

export default PostShow;