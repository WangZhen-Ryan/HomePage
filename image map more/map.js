// var ImageMap = function (map) {
//   var n,
//       areas = map.getElementsByTagName('area'),
//       len = areas.length,
//       coords = [],
//       previousWidth = 2245;
//   for (n = 0; n < len; n++) {
//       coords[n] = areas[n].coords.split(',');
//   }
//   this.resize = function () {
//       var myImg = document.querySelector("#travelmap");
//       var n, m, clen,
//           ratio = myImg.clientWidth / previousWidth;
//       for (n = 0; n < len; n++) {
//           clen = coords[n].length;
//           for (m = 0; m < clen; m++) {
//               coords[n][m] *= ratio;
//           }
//           areas[n].coords = coords[n].join(',');
//       }
//       previousWidth = myImg.clientWidth;
//       return true;
//   };
//   window.onresize = this.resize;
// }