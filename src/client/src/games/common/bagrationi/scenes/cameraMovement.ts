import { Cameras } from "phaser"


//     movingCameraAccordingCursors(){
//         const cursors = this.input.keyboard.createCursorKeys();
//         let cameraSpeed = 6;
//         let minX = -this.game.canvas.width/2; // adjust these to set the limits of the camera movement
//         let maxX = this.game.canvas.width/2;
//         let minY = -this.game.canvas.height/2;
//         let maxY = this.game.canvas.height/2;
//         // update the camera position every frame
//         this.events.on('update', () => {
//           if (cursors.up.isDown) {
//             if (this.cameras.main.scrollY > minY) {
//               this.cameras.main.scrollY -= cameraSpeed;
//             }
//           } else if (cursors.down.isDown) {
//             if (this.cameras.main.scrollY < maxY) {
//               this.cameras.main.scrollY += cameraSpeed;
//             }
//           }
//           if (cursors.left.isDown) {
//             if (this.cameras.main.scrollX > minX) {
//               this.cameras.main.scrollX -= cameraSpeed;
//             }
//           } else if (cursors.right.isDown) {
//             if (this.cameras.main.scrollX < maxX) {
//               this.cameras.main.scrollX += cameraSpeed;
//             }
//           }
//         });
//       }
