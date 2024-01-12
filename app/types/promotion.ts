export interface IPromotion {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  CardType: string;
  ExternalUrl: string;
  Id: 103;
  ImageUrl: string;
  IsLuckyDay: boolean;
  ListButtonText: string;
  ListButtonTextBackGroudColor: string;
  LuckyDayBackgroundColor: string | null;
  LuckyDayText: '';
  LuckyDayTextColor: string | null;
  PromotionCardColor: string;
  RemainingText: string;
  ScenarioType: string;
  SeoName: string;
  Title: string;
  Unavailable: boolean;
  Unvisible: boolean;
  Description: String;
  PromotionDetailItemAreas: [
    {
      Title: string;
      Description: string;
    },
  ];
}
