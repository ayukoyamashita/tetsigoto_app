# frozen_string_literal: true

require 'test_helper'

class StampCardDecoratorTest < ActiveSupport::TestCase
  def setup
    @stamp_card = StampCard.new.extend StampCardDecorator
  end

  # test "the truth" do
  #   assert true
  # end
end
