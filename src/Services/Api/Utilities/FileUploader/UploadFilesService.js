import http from './http-common'

class UploadFilesService {
  upload(file, onUploadProgress, hotelId) {
    let formData = new FormData()

    formData.append('image', file)
    formData.append('id', hotelId)

    return http.post('/api/v1/uploads/hotel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
  }

  getFiles() {
    return http.get('/files')
  }
  uploadSouvenir(
    file,
    onUploadProgress,
    title,
    subTitle,
    description,
    hotelId
  ) {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('subTitle', subTitle)
    formData.append('description', description)
    formData.append('image', file)
    formData.append('hotelId', hotelId)
    return http.post('/api/v1/uploads//hotel/souvenir', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
  }

  uploadRoomImage(file, onUploadProgress, roomId) {
    let formData = new FormData()
    formData.append('roomId', roomId)
    formData.append('image', file)

    return http.post('/api/v1/uploads/room', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
  }
}

export default new UploadFilesService()
