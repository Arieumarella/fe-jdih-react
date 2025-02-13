import React from 'react';

const Card = () => {
  return (
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
    <div class="shrink-0">
      <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo"/>
    </div>
    <div>
      <div class="text-2-xl font-medium text-black">ChitChat</div>
      <p class="text-slate-500">You have a new message!</p>
    </div>
  </div>
  );
};

export default Card;
