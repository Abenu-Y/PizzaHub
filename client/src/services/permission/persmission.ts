// src/permissions.js
import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbility = (user:boolean) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user) {
    can('order', 'Pizza'); // Authenticated users can order pizza
  } else {
    cannot('order', 'Pizza'); // Guests cannot order pizza
  }

  return build();
};
