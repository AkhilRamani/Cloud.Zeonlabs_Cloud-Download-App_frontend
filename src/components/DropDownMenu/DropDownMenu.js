import React, {useState} from 'react'
import toast from 'toasted-notes'
import {connect} from 'react-redux'
// import ReactNotification from 'react-notifications-component'
import Popup from 'reactjs-popup'
import {Button} from '../utility/Button/button.utility'

import './dropDownMenu.style.scss'
import {ShareIcon, DeleteIcon, RenameIcon, DownloadIcon, ErrorOutlineIcon} from '../icons/icons'
import { deleteFile as deleteFileApi } from '../../apis/apis';
import {deleteFile as deleteReduxFile} from '../../redux/actions/file.action'


const DdMenuItem = ({name, onClick, Icon}) => (
    <div className="ddm-item g-flex-ac" onClick={onClick} >
        {Icon}
        <p className='ddm-text g-roboto' >{name}</p>
    </div>
)

const PopupBox = ({trigger, content, closeOutsideClick}) => (
    <Popup
        trigger={trigger}
        modal
        closeOnDocumentClick={closeOutsideClick}
        contentStyle={{ borderRadius: 5, width: 'auto', padding: 0, border: 'none' }}
    >{content}</Popup>
)

const DropDownMenu = ({fileId, close, deleteReduxFile}) => {
    const [loading, setLoading] = useState(false)

    const deleteFile = () => {
        setLoading(true)
        console.log('file id =>> ', fileId)
        deleteFileApi(fileId)
            .then(res => {
                setLoading(false);
                deleteReduxFile(res.data._id)
            })
            .catch(e => {
                setLoading(false);
                console.log(e)
            })
            // .finally(() => setLoading(false))
    }

    return (
        <div className="ddm-main g-flex-ac" >
            <div className="ddm-item g-flex-ac" onClick={() => {close(); toast.notify('Downloading...')}} >
                <DownloadIcon />
                <p className='ddm-text g-roboto' >Download</p>
            </div>


            <Popup 
                trigger={
                    <div className="ddm-item g-flex-ac" >
                        <RenameIcon />
                        <p className='ddm-text g-roboto' >Rename</p>
                    </div>} 
                position='left top'
                closeOnDocumentClick
                contentStyle={{padding: 0, border: 'none', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 12px', borderRadius: 5, width: 'auto' }}
            >
                    {close => (
                        <div className='ddm-main ddm-rename-main g-flex-ac' >
                            <input style={{width: 300}} className='g-input' type='text' placeholder='Enter new file name'  />
                            <div className='ddm-rename-sub g-flex-ac' >
                                <Button style={{minWidth: 75, }} color='#dedede' name='Cancel' onClick={() => close()} />
                                <Button style={{minWidth: 75, marginLeft: 13}} name='Rename' />
                            </div>
                        </div>
                    )}
            </Popup>

            {/* <div key={id} className="ddm-item g-flex-ac" onClick={() => {close()}} >
                <RenameIcon />
                <p className='ddm-text g-roboto' >Rename</p>
            </div> */}


            <div className="ddm-item g-flex-ac" onClick={() => close()} >
                <ShareIcon />
                <p className='ddm-text g-roboto' >Share</p>
            </div>

            <PopupBox 
                trigger={<DdMenuItem Icon={<DeleteIcon />} name='Delete' onClick={() => close()} />}
                content={
                    <>
                        <div style={{width: "100%", height: 10, backgroundColor:'#ff4343', borderRadius: '5px 5px 0 0'}} />

                        <div className='popc-main'>
                            <div className='g-flex-ac popc-sub-div' >
                                <ErrorOutlineIcon className='popc-icon' />
                                <div>
                                    <h4 className='g-roboto' >Are you sure?</h4>
                                    <p className='g-roboto popc-sub-text' >This action cannot be undone.</p>
                                </div>
                            </div>
                            <div className='g-flex-ac popc-btn-div' >
                                <Button color='#dedede' name='Cancel' onClick={() => close()} disabled={loading} />
                                <Button style={{marginLeft: 15}} color='#ff4343' name='Delete' onClick={deleteFile} loading={loading} />
                            </div>
                        </div>
                    </>
                }
                closeOutsideClick={!loading}
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteReduxFile: id => dispatch(deleteReduxFile(id))
})

export default connect(null, mapDispatchToProps)(DropDownMenu)