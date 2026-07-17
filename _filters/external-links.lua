local INTERNAL_HOST = "relyt871.github.io"


local function get_host(target)
  return
    target:match("^https?://([^/%?#:]+)")
    or
    target:match("^//([^/%?#:]+)")
end


function Link(link)
  local host = get_host(link.target)

  if not host then
    return link
  end

  host = host:lower()

  if host == INTERNAL_HOST then
    return link
  end

  link.attributes["target"] = "_blank"
  link.attributes["rel"] = "noopener noreferrer"

  return link
end
