class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :username
  belongs_to :synthroom
end
