/* eslint-disable */

const initDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri(),
  name: uu5String(512),
  sysState: oneOf(["active", "restricted", "readOnly"]),
  adviceNote: shape({
    message: uu5String().isRequired(),
    severity: oneOf(["debug", "info", "warning", "error", "fatal"]),
    estimatedEndTime: datetime(),
  }),
});

const createJokeDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000),
  image: binary(),
  categoryId: array(id(), 1, 10),
  visibility: boolean()
});

const getJokeDtoInType = shape({
  id: id().isRequired()
});

const listJokesDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(0, null),
    pageSize: integer(0, null)
  }).isRequired()
});

const deleteJokeDtoInType = shape({
  id: id().isRequired()
});

const updateJokeDtoInType = shape({
  id: id().isRequired(),
  name: string(255),
  text: string(4000),
  image: binary(),
  categoryId: array(id(), 1, 10),
  visibility: boolean()
});

const jokeGetImageDataDtoInSchema = shape({
  image: code().isRequired(),
  contentDisposition: string()
});