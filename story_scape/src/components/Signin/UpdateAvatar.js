import React,{useState} from 'react'
import AvatarEdit from 'react-avatar-edit';
import profile from '../../assets/images/user_avatar.png'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useAuthValue } from '../../context/userAuthentication';
import styles from '../../styles/sign.module.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateAvatar() {
    const [preview, setPreview] = useState(null);
    const [visible, setVisible] = useState(false);
    const {authetication,handleAuthetication} = useAuthValue()
    const navigate = useNavigate()

    /**
     * Handles upload image crop and set preview
     * @param {*} preview 
     */
    const onCrop = (preview) => {
        setPreview(preview);
      };

      /** 
       * Handles upload of avatar
       */
      const handleUpdateAvatar = async () => {
        try {
          // Check if preview is not null to prevent sending empty image data
          if (preview) {
            const formData = new FormData();
            const blob = await fetch(preview).then((r) => r.blob());
            formData.append('avatar', blob, 'avatar.png');
            const response = await fetch(`${process.env.BACKEND_ENDPOINT}/user/user-avater`, {
              method: 'POST',
              body: formData,
              headers:{
                "Authorization":authetication.token,
              }
            });
            const data = await response.json()
            if (response.ok) {
              handleAuthetication({...authetication,avatar:data.avatar })
              toast.success('User image updated successfully')
              navigate('/')
            } else {
              console.error('Failed to update avatar');
              toast.error('Error uploading image.')
            }
          }
        } catch (error) {
          console.error('Error updating avatar:', error);
        }
      };
    
     
  return (
    <div className={styles.updateAvatarContainer}>
    <div className={styles.avatarContainer}>
        <div className={styles.updateAvatarContainer}>
        <img src={preview?preview:profile} width='300' height="300" alt="user-avatar"/>
        <Button label="Upload" icon="pi pi-external-link"  severity="secondary" onClick={() => setVisible(true)} />

        <div className="card flex justify-content-center">
        <Dialog header="Update profile picture" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <AvatarEdit
              width={300}
              height={300}
              onCrop={onCrop}
              label="Edit Avatar"
              hideClose={true}
            />
          </div>
        </Dialog>
      </div>
        </div>
        <div className={styles.userDetail}>
            <h1>Name        : {authetication.username}</h1>
            <p>Email       : {authetication.email}</p>
            <p>Contact No. : {authetication.contact_no}</p>

        </div>
       
    </div>
    <Button onClick={handleUpdateAvatar}>Update</Button>
    </div>
  )
}

export default UpdateAvatar