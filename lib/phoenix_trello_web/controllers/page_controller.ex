defmodule PhoenixTrelloWeb.PageController do
  use PhoenixTrelloWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
