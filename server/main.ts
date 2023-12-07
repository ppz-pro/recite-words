Deno.serve(
  {
    port: 10002,
  },
  (req: Request): Response => {
    console.log({ req })
    return new Response(
      'hello',
      {
        status: 200,
      },
    )
  }
)
