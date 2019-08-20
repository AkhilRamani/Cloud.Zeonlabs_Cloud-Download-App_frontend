import React, { Component } from 'react'
import {connect} from 'react-redux'

import FileItem from '../FileItem/FileItem'
import {addFile, changeFileStatus} from '../../redux/actions/file.action'
import {Spinner} from '../utility'
import {getAllFiles} from '../../apis/apis'
import {socket} from '../../apis/socket'
import {socketEvents} from '../../apis/config'

class FileList extends Component {
    state = {
        loading: true
    }

    constructor(){
        super()

        socket.on(`${socketEvents.DONE}-${123}`, ({_id}) => {
            console.log('file uploaded ', _id)
            this.props.changeFileStatus(_id)
        })
    }

    componentDidMount(){
        getAllFiles()
            .then(res => res.data.forEach(file => this.props.addFile(file)))
            .catch(e => console.log(e))
            .finally(() => this.setState({loading: false}))
    }

    render(){
        return this.state.loading ? 
            <Spinner style={{margin: 20}} /> 
            : (
            this.props.files.map(file => (
                <FileItem
                    key={file._id}
                    id={file._id}
                    name={file.name}
                    size={file.size}
                    time={file.createdAt}
                    status={file.status}
                />
            ))
        )
    }
}

const mapStateToProps = state => {
    return state.files
}

const mapDispatchToProps = dispatch => {
    return {
        addFile: file => dispatch(addFile(file)),
        changeFileStatus: fileId => dispatch(changeFileStatus(fileId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList)