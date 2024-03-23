/**
 * Reusable arrays for months in different components
 */
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Suggestion tags list
 */
const tagsList= ['Technology','Si-Fi','Life','Startup','Blockchain','Poetry','Travel','Love','Self Improvement','Business','Education','Writing','Social Media', 'Music','Sports','Football','Software','MERN','Java','HTML','JavaScript','Plants','Nature']

/***
 * Quill Editor configration array
 */
const toolbarOptions = [ ['bold', 'italic', 'underline', 'strike'],      // toggled buttons
['blockquote', 'code-block'],                                             
['link', 'image', 'formula'],                                            // Insertions
[{ 'header': 1 }, { 'header': 2 }],                                      // custom button values
[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],       // decoration
[{ 'script': 'sub'}, { 'script': 'super' }],                             // superscript/subscript
[{ 'indent': '-1'}, { 'indent': '+1' }],                                 // outdent/indent
[{ 'size': ['small', false, 'large', 'huge'] }],                         // custom dropdown
[{ 'header': [1, 2, 3, 4, 5, 6, false] }],                               // headers
[{ 'color': [] }, { 'background': [] }],                                 // dropdown with defaults from theme
[{ 'font': [] }],
[{ 'align': [] }],
['clean']       ];


export{months,tagsList,toolbarOptions}