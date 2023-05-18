import { GameManager } from "./gameManager";
import { GamePlay } from "./scenes/gamePlay";

export class OptimizationManager {
  constructor(public scene: GamePlay, public gameManager: GameManager) {
    this.checkGameZone(this.gameManager.saveZoneIndex);
  }

  checkGameZone(index: number) {
    if (index === 0) {
      this.scene.roadToGori.setVisible(false);

      const stars = this.scene.stars.slice(0, this.scene.stars.length);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(false);
        }
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(false);
        this.scene.matter.world.remove(bomb.deadZone);
      });

      const hideRoads = this.scene.roads.slice(5, this.scene.roads.length);
      hideRoads.forEach((road) => {
        this.scene.matter.world.remove(road.collider);
        road.polygon.setVisible(false);
      });

      const hideFlowers = this.scene.flowers.slice(
        10,
        this.scene.flowers.length
      );
      hideFlowers.forEach((flower) => {
        flower.setVisible(false);
      });

      const hideMonets = this.scene.monets.slice(10, this.scene.monets.length);
      hideMonets.forEach((monet) => {
        monet.setVisible(false);
        this.scene.matter.world.remove(monet.zone);
      });

      this.scene.rails.forEach((rail) => {
        rail.setVisible(false);
      });

      this.scene.train.frontVagon.setVisible(false);
      this.scene.matter.world.remove(this.scene.train.frontVagon);
      this.scene.train.backVagon.setVisible(false);
      this.scene.matter.world.remove(this.scene.train.backVagon);
      this.scene.train.leftCircle.setVisible(false);
      this.scene.matter.world.remove(this.scene.train.leftCircle);
      this.scene.train.rightCircle.setVisible(false);
      this.scene.matter.world.remove(this.scene.train.rightCircle);

      const hideAngels = this.scene.angels.slice(1, this.scene.angels.length);
      hideAngels.forEach((angel) => {
        angel.setVisible(false);
      });

      this.scene.matter.world.remove(this.scene.russianTank.tankBody);
      this.scene.russianTank.tankBody.setVisible(false);

      this.scene.russianSoldiers.forEach((soldier) => {
        soldier.head.setVisible(false);
        this.scene.matter.world.remove(soldier.head);
        soldier.body.setVisible(false);
        this.scene.matter.world.remove(soldier.body);
        soldier.leftLeg.setVisible(false);
        this.scene.matter.world.remove(soldier.leftLeg);
        soldier.rightLeg.setVisible(false);
        this.scene.matter.world.remove(soldier.rightLeg);
        soldier.leftHand.setVisible(false);
        this.scene.matter.world.remove(soldier.leftHand);
        soldier.rightHand.setVisible(false);
        this.scene.matter.world.remove(soldier.rightHand);

        soldier.bodyHandAnimation.remove();
        soldier.headAnimation.remove();

        soldier.bullets.forEach((bullet) => {
          bullet.setVisible(false);
          this.scene.matter.world.remove(bullet);
        });
      });

      this.gameManager.skyRocks.forEach((rock) => {
        rock.rockImage.setVisible(false);
        this.scene.matter.world.remove(rock.rockImage);
      });
    }

    if (index === 6 || index === 5) {
      this.scene.tbilisi.setVisible(false);
      this.scene.roadToGori.setVisible(true);

      const hideStars = this.scene.stars.slice(0, 3);
      hideStars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(false);
        }
      });

      const showStars = this.scene.stars.slice(3, this.scene.stars.length);
      showStars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(false);
        }
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(false);
        this.scene.matter.world.remove(bomb.deadZone);
      });

      const hideRoads = this.scene.roads.slice(5, 11);
      hideRoads.forEach((road) => {
        this.scene.matter.world.remove(road.collider);
        road.polygon.setVisible(false);
      });
      const showRoads = this.scene.roads.slice(11, this.scene.roads.length);
      showRoads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const hideFlowers = this.scene.flowers.slice(0, 55);
      hideFlowers.forEach((flower) => {
        flower.setVisible(false);
      });
      const showFlowers = this.scene.flowers.slice(
        55,
        this.scene.flowers.length
      );
      showFlowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const hideMonets = this.scene.monets.slice(0, 20);
      hideMonets.forEach((monet) => {
        monet.setVisible(false);
        this.scene.matter.world.remove(monet.zone);
      });
      const showMonets = this.scene.monets.slice(20, this.scene.monets.length);
      showMonets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.remove(monet.zone);
      });

      this.scene.rails.forEach((rail) => {
        rail.setVisible(true);
      });

      this.scene.train.frontVagon.setVisible(true);
      this.scene.matter.world.add(this.scene.train.frontVagon);
      this.scene.train.backVagon.setVisible(true);
      this.scene.matter.world.add(this.scene.train.backVagon);
      this.scene.train.leftCircle.setVisible(true);
      this.scene.matter.world.add(this.scene.train.leftCircle);
      this.scene.train.rightCircle.setVisible(true);
      this.scene.matter.world.add(this.scene.train.rightCircle);

      const hideAngels = this.scene.angels.slice(0, 4);
      hideAngels.forEach((angel) => {
        angel.setVisible(false);
      });
      const showAngels = this.scene.angels.slice(4, this.scene.angels.length);
      showAngels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.matter.world.add(this.scene.russianTank.tankBody);
      this.scene.russianTank.tankBody.setVisible(true);

      this.scene.russianSoldiers.forEach((soldier) => {
        soldier.stopShoot();

        soldier.head.setVisible(false);
        this.scene.matter.world.remove(soldier.head);
        soldier.body.setVisible(false);
        this.scene.matter.world.remove(soldier.body);
        soldier.leftLeg.setVisible(false);
        this.scene.matter.world.remove(soldier.leftLeg);
        soldier.rightLeg.setVisible(false);
        this.scene.matter.world.remove(soldier.rightLeg);
        soldier.leftHand.setVisible(false);
        this.scene.matter.world.remove(soldier.leftHand);
        soldier.rightHand.setVisible(false);
        this.scene.matter.world.remove(soldier.rightHand);

        soldier.bodyHandAnimation.remove();
        soldier.headAnimation.remove();

        soldier.bullets.forEach((bullet) => {
          bullet.setVisible(false);
          this.scene.matter.world.remove(bullet);
        });
      });

      this.gameManager.skyRocks.forEach((rock) => {
        rock.rockImage.setVisible(false);
        this.scene.matter.world.remove(rock.rockImage);
      });
    }
  }
}
