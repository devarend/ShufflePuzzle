import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  allItems: (number | null)[] = [];
  imageUrl = '/logo.png';

  ngOnInit() {
    this.reset()
  }

  reset() {
    const items = Array.from({ length: 15 }, (_, i) => i + 1);
    const shuffledItems = this.fisherYatesShuffle(items);
    this.allItems = [...shuffledItems, null];
  }

  fisherYatesShuffle(array: number[]): number[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  move(index: number) {
    const emptyIndex = this.allItems.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    if (!validMoves.includes(index)) return;

    const updated = [...this.allItems];
    updated[emptyIndex] = updated[index];
    updated[index] = null;
    this.allItems = updated;
  }

  solve() {
    const items = Array.from({ length: 15 }, (_, i) => i + 1);
    this.allItems = [...items, null];
  }

  getBackgroundPosition(tile: number): string {
    const tileRow = Math.floor((tile - 1) / 4);
    const tileCol = (tile - 1) % 4;
    const xPos = (tileCol / 3) * 100;
    const yPos = (tileRow / 3) * 100;
    return `${xPos}% ${yPos}%`;
  }

  isSolved(): boolean {
    return this.allItems.every((num, i) =>
      i === this.allItems.length - 1 ? num === null : num === i + 1
    );
  }
}
