# frozen_string_literal: true

require "open3"

module Jekyll
  module Converters
    class Markdown
      class Pandoc
        INPUT_FORMAT = [
          "markdown",
          "+tex_math_dollars",
          "+raw_html",
          "+pipe_tables",
          "+fenced_code_blocks",
          "+backtick_code_blocks",
          "+footnotes",
          "+strikeout",
          "+task_lists",
          "+autolink_bare_uris",
          "-implicit_figures"
        ].join.freeze

        def initialize(_config)
        end

        def convert(content)
          command = [
            "pandoc",
            "--from=#{INPUT_FORMAT}",
            "--to=html5",
            "--mathjax",
            "--wrap=none"
          ]

          output, error, status = Open3.capture3(
            *command,
            stdin_data: content
          )

          return output if status.success?

          raise Jekyll::Errors::FatalException,
                "Pandoc conversion failed:\n#{error}"
        end
      end
    end
  end
end
