export function validateVIN(id: string) {
  let result: {
    error?: string
    ok?: boolean
  } = {}

  if (id.length < 17) {
    result = {
      error:
        id.length === 0
          ? "This field can't be empty"
          : 'Please check your VIN number. It should have 17 characters',
    }
  } else if (!/^[A-Za-z0-9]*$/.test(id)) {
    result = {
      error:
        'Please check your VIN number. It should have only letters and digits',
    }
  } else {
    result = {
      ok: true,
    }
  }

  return result
}
