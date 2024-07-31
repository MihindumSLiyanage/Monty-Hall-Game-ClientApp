export class MontyHall {
  Rounds?: number;
  InitialDoorSelection?: number;
  ChangeDoor?: string;
  finalDoor?: number;
  correctDoor?: number;
  isWin?: boolean;
  message?: boolean;
}

export class PlayRequest {
  InitialDoorSelection?: number;
  ChangeDoor?: boolean;
}
