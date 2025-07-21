/** biome-ignore-all lint/suspicious/noConsole: sample */
'use client';

import { sampleSchema, tryCatch } from 'dita-utils';

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <button
        className="grid h-10 min-w-20 place-items-center rounded border border-neutral-50 px-3"
        onClick={async () => {
          const response = sampleSchema.safeParse({ hello: '123' });
          console.log(response);

          const response2 = await tryCatch(
            new Promise((resolve) =>
              resolve(sampleSchema.parse({ hello: '123' }))
            )
          );
          console.log(response2);
        }}
        type="submit"
      >
        hello
      </button>
    </main>
  );
}
