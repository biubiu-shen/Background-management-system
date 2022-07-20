import Quill from 'quill'
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      'bold', 'italic', 'underline',
      { header: 1 }, { header: 2 },
      'blockquote', 'code-block', 'code', 'link',
      { list: 'ordered' }, { list: 'bullet' },
      'image'
    ]
  }

})
