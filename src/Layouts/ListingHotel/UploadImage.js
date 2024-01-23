import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import DarkOverlaybackGround from '../../Components/DarkOverlaybackGround/DarkOverlaybackGround'
import Navbars from '../../Components/Navbar/Navbar'
import UploadService from '../../Services/Api/Utilities/FileUploader/UploadFilesService'
import { getHotelById } from '../../Services/Api/Utilities/Index.js'
import Footer from '../Footer/Footer.js'
class UploadImage extends Component {
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
      uploaded: false,
      show: false,
      propertyImage: null,
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    toast.configure()
    this.setState({
      hotelId: this.state.hotelId.split('=')[1],
    })
    this.getHotelInfo()
  }

  upload() {
    if (!this.state.uploaded) {
      let currentFile = this.state.selectedFiles[0]
      this.setState({
        progress: 0,
        currentFile: currentFile,
        loading: true,
      })
      UploadService.upload(
        currentFile,
        (event) => {
          this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
          })
        },
        this.state.hotelId
      )
        .then((response) => {
          this.setState({
            message: response.data.message,
            progress: 100,
            loading: false,
            uploaded: true,
          })

          this.notifySuccess('successfully uploaded')
        })

        .catch(() => {
          this.setState({
            progress: 0,
            message: 'Could not upload the file!',
            currentFile: undefined,
          })
          this.notifyError('Could not upload the file!')
        })

      this.setState({
        selectedFiles: undefined,
      })
    } else {
      this.setState({
        show: true,
      })
    }
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({ selectedFiles: files })
    }
  }
  getHotelInfo = async () => {
    const dataModel = {
      id: this.state.hotelId.split('=')[1],
    }

    await getHotelById(dataModel)
      .then((res) => {
        if (res.status == 200 && res.data[0].image != null) {
          this.setState({
            uploaded: true,
          })
          this.setState({
            propertyImage: res.data[0].image,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  handleClose = () => {
    this.setState({
      show: false,
    })
  }
  handleShow = () => {
    this.setState({
      show: true,
    })
  }

  notifySuccess = (message) => {
    toast.success(message)
  }
  notifyError = (message) => {
    toast.error(message)
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
      uploaded,
    } = this.state

    return (
      <div>
        <Navbars />
        <div className='upload-container'>
          <div class='container step-indicator '>
            <ul class='list-unstyled multi-steps'>
              <li>Basic Information</li>
              <li class='is-active'>Upload hotel Image</li>
              <li>Upload souvenir Images</li>
              <li>Add value added servces</li>
              <li>Facilities</li>{' '}
            </ul>
          </div>
          <div className='container mt-5'>
            <small id='emailHelp' class='form-text text-muted'>
              This image is visible on search result !
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
            <div className='next-container'>
              <button
                className='previous-button btn btn-primary'
                // onClick={() => {
                //   navigate(-1)
                // }}
              >
                {'<'} Previous!
              </button>
              {this.state.uploaded ? (
                <Link to={`/seller/hotel/souvenir?id=${this.state.hotelId}`}>
                  <button type='submit' className='next-button btn btn-primary'>
                    Next! {'>'}
                  </button>
                </Link>
              ) : (
                <button className='next-button btn btn-primary' disabled>
                  Next! {'>'}
                </button>
              )}
            </div>
          </div>
          <Modal
            show={this.state.show}
            onHide={() => {
              this.handleClose()
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Property Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='modal-propertyImage'>
                <img src={this.state.propertyImage} alt='' />
                <div className='row mt-3'>
                  Do you want to overwrite this image?
                  <small>
                    Important! This image will disappear after when you
                    overwrite
                  </small>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <button
                      className='btn btn-primary modal-btn-image'
                      onClick={() => {
                        this.setState({
                          uploaded: false,
                          show: false,
                        })
                        this.upload()
                      }}
                    >
                      Yes
                    </button>
                  </div>
                  <div className='col-6'>
                    <button
                      className='btn btn-primary modal-btn-image'
                      onClick={() => {
                        this.setState({
                          show: false,
                        })
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
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

export default UploadImage
