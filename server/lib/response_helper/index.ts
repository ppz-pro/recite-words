export
const res_err = {
  not_found: () =>
    new Response(`not found`, { status: 404 }),
  bad_req: () =>
    new Response(`bad request`, { status: 400 }),
}
