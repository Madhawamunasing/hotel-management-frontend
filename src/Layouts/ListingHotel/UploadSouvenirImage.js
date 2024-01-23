import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import Navbars from '../../Components/Navbar/Navbar'
import UploadService from '../../Services/Api/Utilities/FileUploader/UploadFilesService'
import Footer from '../Footer/Footer.js'
import UploadedSouvenirImages from './UploadedSouvenirImages'
class UploadSouvenirImage extends Component {
  constructor(props) {
    super(props)
    this.upload = this.upload.bind(this)
    this.onDrop = this.onDrop.bind(this)

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileInfos: [],
      hotelId: window.location.href,
      uploadedImages: [],
    }
  }

  componentDidMount() {
    toast.configure()
    window.scrollTo(0, 0)
    this.setState({
      hotelId: this.state.hotelId.split('=')[1],
    })
  }
  notifySuccess = (message) => {
    toast.success(message)
  }
  notifyError = (message) => {
    toast.error(message)
  }
  upload() {
    let currentFile = this.state.selectedFiles[0]
    let title = document.getElementsByName('title')[0].value
    let subTitle = document.getElementsByName('sub_title')[0].value
    let description = document.getElementsByName('description')[0].value

    this.setState({
      progress: 0,
      currentFile: currentFile,
      loading: true,
    })

    UploadService.uploadSouvenir(
      currentFile,
      (event) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        })
      },
      title,
      subTitle,
      description,
      this.state.hotelId
    )
      .then((response) => {
        document.getElementsByName('title')[0].value = ''
        document.getElementsByName('sub_title')[0].value = ''
        document.getElementsByName('description')[0].value = ''
        this.setState({
          message: response.data.message,
          progress: 0,
          loading: false,
        })
        this.notifySuccess('successfully uploaded')
      })

      .catch(() => {
        this.setState({
          progress: 0,
          message: 'Could not upload the file!',
          currentFile: undefined,
          loading: false,
        })
        this.notifyError('Could not upload the file!')
      })

    this.setState({
      selectedFiles: undefined,
    })
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files })
    }
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      loading,
      hotelId,
      uploadedImages,
    } = this.state

    return (
      <div>
        <Navbars />
        <div className='upload-container'>
          <div class=' step-indicator '>
            <ul class='list-unstyled multi-steps'>
              <li>Basic Information</li>
              <li>Upload hotel Image</li>
              <li class='is-active'>Upload souvenir Images</li>
              <li>Add value added servces</li>
              <li>Facilities</li>
            </ul>
          </div>
          <div className='container mt-5'>
            <div>
              <small id='emailHelp' class='form-text text-muted'>
                Important !
              </small>
              You have to upload 3 minimum images and fill other required
              fields.Then you can go to next page .
              <div className='row'>
                <div class='form-group col-lg-6'>
                  <label for='last Name'> Titles *</label>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Enter title'
                    name='title'
                    required
                  />
                </div>
                <div class='form-group col-lg-6'>
                  <label for='last Name'>Sub Title *</label>
                  <input
                    type='text'
                    class='form-control sub_title'
                    placeholder='Enter sub title'
                    name='sub_title'
                    required
                  />
                </div>
              </div>
              <div className='row'>
                <label for='floatingTextarea2'>Description </label>
                <div class='form-floating'>
                  <textarea
                    class='form-control'
                    placeholder='Leave a comment here'
                    id='floatingTextarea2'
                    style={{ height: '100px' }}
                    name='description'
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <small id='emailHelp' class='form-text text-muted'>
              You can upload multiple images. these images are display on your
              hotel page !
            </small>
            {currentFile && this.state.loading && (
              <div className='progress mb-3'>
                <div
                  className='progress-bar progress-bar-info progress-bar-striped'
                  role='progressbar'
                  aria-valuenow={progress}
                  aria-valuemin='0'
                  aria-valuemax='100'
                  style={{ width: progress + '%' }}
                >
                  {progress}%
                </div>
              </div>
            )}

            <Dropzone onDrop={this.onDrop} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    {selectedFiles && selectedFiles[0].name ? (
                      <div className='selected-file'>
                        {selectedFiles && selectedFiles[0].name}
                      </div>
                    ) : (
                      'Drag and drop file here, or click to select file'
                    )}
                  </div>
                  <aside className='selected-file-wrapper'>
                    <button
                      className='btn btn-success'
                      disabled={!selectedFiles}
                      onClick={this.upload}
                    >
                      Upload
                    </button>
                  </aside>
                </section>
              )}
            </Dropzone>
            <UploadedSouvenirImages trigger={loading} />
          </div>
        </div>

        <DarkOverlaybackGround
          loading={loading}
          content={'Uplading your image'}
        />
        <Footer />
      </div>
    )
  }
}

export default UploadSouvenirImage
