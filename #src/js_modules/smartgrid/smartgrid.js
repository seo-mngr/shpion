module.exports = {
	/* It's principal settings in smart grid project */
  filename: "_grid",
  outputStyle: 'sass', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1170px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    xl: {
        width: '1200px', /* -> @media (max-width: 1200px) */
    },
    lg: {
        width: '992px', /* max-width: "720px" */
        fields: '15px',
    },
    md: {
        width: '768px', /* max-width: "720px" */
        /*fields: '15px',  set fields only if you want to change container.fields */
    },
    sm: {
        width: '576px', /* max-width: "404px" */
    },
    xs: {
        width: '375px', /* max-width: "320px" */
        offset: '10px',
    }
    /* 
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  }
};