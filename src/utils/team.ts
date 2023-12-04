import { Player } from '../app/Interfaces/player';

export class Team {
  teamName: string;
  owner_id: string;
  avatar_id: string;
  roster: Player[];
  totalPts: number;
  totalWeekly: number;
  totalTradeValue: number;

  constructor(tName: string, owner: string, avatar: string) {
    this.teamName = tName || '';
    this.owner_id = owner;
    this.avatar_id = avatar || '';
    this.roster = [];
    this.totalPts = 0;
    this.totalWeekly = 0;
    this.totalTradeValue = 0;
  }

  construct(): void {
    this.calculateTotalPts();
    this.calculateTradeValue();
    this.calculateTotalWeekly();
  }

  calculateTotalPts(): void {
    this.totalPts = 0;
    this.roster.forEach((player: Player) => {
      if (player) {
        this.totalPts += player.actualTotalPts;
      }
    });
  }

  calculateTradeValue(): void {
    this.totalTradeValue = 0;
    this.roster.forEach((player: Player) => {
      if (player) {
        this.totalTradeValue += player.tradeValue;
      }
    });
  }

  calculateTotalWeekly(): void {
    this.totalWeekly = 0;
    this.roster.forEach((player: Player) => {
      if (player) {
        this.totalWeekly += player.avgActualPts;
      }
    });
  }
}
