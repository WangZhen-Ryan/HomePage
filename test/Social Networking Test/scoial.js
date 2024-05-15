twttr.widgets.createFollowButton(
    'TwitterDev',
    document.getElementById('container'),
    {
      size: 'large'
    }
  ).then( function( el ) {
    console.log('Follow button added.');
  });