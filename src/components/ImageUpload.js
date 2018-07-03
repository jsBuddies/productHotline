import React from 'react';
import firebase from 'firebase';

class ImageUpload extends React.Component {
    constructor() {
        super();
    }

    handleSubmit(e) {
        e.preventDefault();
        const ref = firebase.storage().ref(`phone-phax`);
        const file = document.querySelector('#image').files[0]
        const name = (+new Date()) + '-' + file.name;
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                console.log(url);
                // document.querySelector('#someImageTagID').src = url;
            })
            .catch(console.error);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            Hello!
                <input type="file" accept="images/*" name="image" id="image" />
                <input type="submit" />
            </form>
        )
    }
}

export default ImageUpload;